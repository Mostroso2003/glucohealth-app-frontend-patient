import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonContent,
  useIonLoading,
  useIonAlert,
} from '@ionic/react';
import { WeekDays } from './components/week-days';
import { MedicationCard } from '~/shared/components/medication-card';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getOwnPatientTreatmentByDate } from '~/features/treatment/services/get-patient-treatment-by-date';
import { toIsoString } from '~/shared/utils/construct-date-string';
import { isMedicationInTakingRange } from '~/shared/utils/medication-in-taking-range';
import {
  TakeMedicationDto,
  takeMedication as takeMedicationService,
} from '~/features/treatment/services/take-medication';
import { getOwnProfile } from '~/features/patients/services/get-profile';
import { QUERY_KEYS as PATIENT_QUERY_KEYS } from '~/features/patients/constants';
import { QUERY_KEYS as IMC_QUERY_KEYS } from '~/features/imc/constants';
import { getImcByPatientId } from '~/features/imc/services/get-by-id';

export function DashboardPage() {
  const currentDate = new Date();
  const [presentLoading, dismissLoading] = useIonLoading();
  const [presentAlert] = useIonAlert();

  // Query para obtener el perfil del paciente
  const { data: patientId, isLoading: isProfileLoading, isError: isProfileError } = useQuery({
    queryKey: [PATIENT_QUERY_KEYS.PROFILE],
    queryFn: async () => {
      presentLoading();
      try {
        const patient = await getOwnProfile();
        console.log('Patient ID:', patient.id);
        return patient.id;
      } finally {
        dismissLoading();
      }
    },
  });

  // Query para obtener el tratamiento del día
  const { data: dateTreatment, isLoading: isTreatmentLoading } = useQuery({
    queryKey: ['CURRENT_TREATMENT_LIST', patientId],
    queryFn: async () => {
      presentLoading();
      try {
        const res = await getOwnPatientTreatmentByDate(toIsoString(currentDate));
        return res.map(dt => ({
          ...dt,
          schedule: dt.schedule.filter(s =>
            isMedicationInTakingRange(s.expectedTakingTimestamp),
          ),
        }));
      } finally {
        dismissLoading();
      }
    },
    enabled: !!patientId, // Solo se ejecuta si patientId está disponible
  });

  // Query para obtener los datos del IMC
  const { data: imcData, isLoading: isImcLoading } = useQuery({
  queryKey: [IMC_QUERY_KEYS.IMC_DATA, patientId],
  queryFn: () => {
    if (patientId !== undefined) {
      return getImcByPatientId(patientId);
    }
    return Promise.reject(new Error("patientId is undefined"));
  },
  enabled: !!patientId, // Solo se ejecuta si patientId está disponible
});

  // Mutación para registrar la toma de un medicamento
  const { mutate: takeMedication } = useMutation({
    mutationFn: async (data: Omit<TakeMedicationDto, 'treatmentId'>) => {
      presentLoading();
      try {
        await takeMedicationService(data);
      } finally {
        dismissLoading();
      }
    },
    onSuccess: () => {
      presentAlert('Medicamento registrado exitosamente');
    },
    onError: () => {
      presentAlert('Error al tomar medicamento');
    },
  });

  // Render de estados de carga
  if (isProfileLoading || isTreatmentLoading || isImcLoading) {
    return <div>Loading...</div>;
  }

  if (isProfileError) {
    return <div>Error loading patient profile</div>;
  }

  // Calcular IMC
  const weightInKg = imcData?.weightInKg ?? 0;
  const heightInCm = imcData?.heightInCm;
  
  // Convertir altura de cm a metros
  const heightInM = (heightInCm ?? 0) / 100;
  
  // Calcular IMC
  const imc = weightInKg / (heightInM * heightInM);
  const imcRounded = imc.toFixed(2);

  // Clasificar IMC
  let imcClassification = '';
  if (imc < 18.5) {
    imcClassification = 'Bajo peso';
  } else if (imc >= 18.5 && imc < 24.9) {
    imcClassification = 'Normal';
  } else if (imc >= 25 && imc < 29.9) {
    imcClassification = 'Sobrepeso';
  } else {
    imcClassification = 'Obesidad';
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hoy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <WeekDays />

        <IonText>
          <h1 className="ml-2 text-xl font-bold">Clasificación del IMC</h1>
          <p className="ml-2 text-lg">
            {imcData ? `IMC: ${imcRounded} (${imcClassification})` : 'Reload'}
          </p>
        </IonText>

        <IonText>
          <h1 className="ml-2 text-xl font-bold">Medicaciones por tomar</h1>
        </IonText>

        {dateTreatment?.length === 0 ||
        dateTreatment?.every(dt => dt.schedule.length === 0) ? (
          <h4 className="pl-3 italic opacity-50">Sin tratamientos cercanos.</h4>
        ) : (
          dateTreatment?.map(treatment =>
            treatment.schedule.map(schedule => (
              <MedicationCard
                key={`${schedule.expectedTakingTimestamp}-${treatment.medicament.tradeName}`}
                medication={{
                  medicament: treatment.medicament.tradeName,
                  dosage: treatment.dose,
                  time: new Date(schedule.expectedTakingTimestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true,
                  }),
                  taken: schedule.actualTakingTimestamp !== null,
                }}
                takeMedication={() =>
                  takeMedication({
                    medicamentId: treatment.medicament.id,
                    takingTimestamp: toIsoString(new Date()),
                  })
                }
                isTakable={isMedicationInTakingRange(schedule.expectedTakingTimestamp)}
              />
            )),
          )
        )}
      </IonContent>
    </IonPage>
  );
}
