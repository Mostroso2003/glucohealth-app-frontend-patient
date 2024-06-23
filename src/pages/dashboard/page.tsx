import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonContent,
  useIonLoading,
  useIonAlert,
} from '@ionic/react'
import { WeekDays } from './components/week-days'
import { MedicationCard } from '~/shared/components/medication-card'
import { useMutation, useQuery } from '@tanstack/react-query'
import { getOwnPatientTreatmentByDate } from '~/features/treatment/services/get-patient-treatment-by-date'
import { toIsoString } from '~/shared/utils/construct-date-string'
import { isMedicationInTakingRange } from '~/shared/utils/medication-in-taking-range'
import {
  TakeMedicationDto,
  takeMedication as takeMedicationService,
} from '~/features/treatment/services/take-medication'

export function DashboardPage() {
  const currentDate = new Date()

  const [presentLoading, dismissLoading] = useIonLoading()
  const [presentAlert] = useIonAlert()

  const { data: dateTreatment, refetch } = useQuery({
    queryKey: ['CURRENT_TREATMENT_LIST'],
    queryFn: async () => {
      try {
        presentLoading()
        const res = await getOwnPatientTreatmentByDate(toIsoString(currentDate))

        const nextMedications = res.map(dt => ({
          ...dt,
          schedule: dt.schedule.filter(s =>
            isMedicationInTakingRange(s.expectedTakingTimestamp),
          ),
        }))
        return nextMedications
      } catch (e) {
        console.error(e)
      } finally {
        dismissLoading()
      }
    },
  })

  const { mutate: takeMedication } = useMutation({
    mutationFn: async (data: Omit<TakeMedicationDto, 'treatmentId'>) => {
      await takeMedicationService(data)
    },
    onMutate: () => {
      presentLoading()
    },
    onSuccess: () => {
      refetch()
    },
    onError: e => {
      presentAlert('Error al tomar medicamento')
    },
    onSettled: () => {
      dismissLoading()
    },
  })

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Hoy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <WeekDays />

        <IonText className="">
          <h1 className="ml-2 text-xl font-bold">Medicaciones por tomar</h1>
        </IonText>

        {(dateTreatment?.length === 0 ||
          dateTreatment?.every(dt => dt.schedule.length === 0)) && (
          <h4 className="pl-3 italic opacity-50">Sin tratamientos cercanos.</h4>
        )}

        {dateTreatment?.map(treatment =>
          treatment.schedule.map(schedule => {
            return (
              <MedicationCard
                key={
                  schedule.expectedTakingTimestamp +
                  treatment.medicament.tradeName
                }
                medication={{
                  medicament: treatment.medicament.tradeName,
                  dosage: treatment.dose,
                  time: schedule.expectedTakingTimestamp.toLocaleTimeString(
                    [],
                    { hour: '2-digit', minute: '2-digit', hour12: true },
                  ),
                  taken: schedule.actualTakingTimestamp !== null,
                }}
                takeMedication={() =>
                  takeMedication({
                    medicamentId: treatment.medicament.id,
                    takingTimestamp: toIsoString(new Date()),
                  })
                }
                isTakable={isMedicationInTakingRange(
                  schedule.expectedTakingTimestamp,
                )}
              />
            )
          }),
        )}
      </IonContent>
    </IonPage>
  )
}
