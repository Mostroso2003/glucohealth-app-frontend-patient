import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonContent,
  useIonLoading,
} from '@ionic/react'
import { WeekDays } from './components/week-days'
import { MedicationCard } from '~/shared/components/medication-card'
import { useQuery } from '@tanstack/react-query'
import { getOwnPatientTreatmentByDate } from '~/features/treatment/services/get-patient-treatment-by-date'
import { toIsoString } from '~/shared/utils/construct-date-string'

export function DashboardPage() {
  const currentDate = new Date()

  const [presentLoading, dismissLoading] = useIonLoading()

  const { data: dateTreatment } = useQuery({
    queryKey: ['CURRENT_TREATMENT_LIST'],
    queryFn: async () => {
      try {
        presentLoading()
        const res = await getOwnPatientTreatmentByDate(toIsoString(currentDate))
        const lowerDatetimeBound = new Date(currentDate)

        const upperDatetimeBound = new Date(currentDate)
        upperDatetimeBound.setHours(upperDatetimeBound.getHours() + 1)

        const nextMedications = res.map(dt => ({
          ...dt,
          schedule: dt.schedule.filter(
            s =>
              lowerDatetimeBound <= s.expectedTakingTimestamp &&
              s.expectedTakingTimestamp <= upperDatetimeBound,
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
              />
            )
          }),
        )}
      </IonContent>
    </IonPage>
  )
}
