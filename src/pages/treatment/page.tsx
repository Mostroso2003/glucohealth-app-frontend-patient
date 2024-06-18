import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  IonText,
  useIonLoading,
} from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import { getOwnPatientTreatmentByDate } from '~/features/treatment/services/get-patient-treatment-by-date'
import { MedicationCard } from '~/shared/components/medication-card'
import { toIsoString } from '~/shared/utils/construct-date-string'

export function TreatmentPage() {
  let isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches

  const [presentLoading, dismissLoading] = useIonLoading()

  const [date, setDate] = useState(new Date())

  const { data: dateTreatment } = useQuery({
    queryKey: [
      'DAY_TREATMENT_LIST',
      date.toLocaleString([], {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
      }),
    ],
    queryFn: async () => {
      try {
        presentLoading()
        const res = await getOwnPatientTreatmentByDate(toIsoString(date))
        console.log(res)
        return res
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
          <IonTitle>Tratamiento</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div
          className={`flex justify-center ${isDarkMode ? 'bg-bg-datetime-customized-color-dark' : 'bg-bg-datetime-customized-color-light'}`}
        >
          <IonDatetime
            locale="es"
            mode="ios"
            id="treatmentDay"
            presentation="date"
            onIonChange={e => setDate(new Date(e.detail.value as string))}
            max={new Date().toISOString()}
          ></IonDatetime>
        </div>

        <IonText className="">
          <h1 className="ml-2 text-xl font-bold">Medicaciones</h1>
        </IonText>
        <div>
          {(dateTreatment?.length === 0 ||
            dateTreatment?.every(dt => dt.schedule.length === 0)) && (
            <h4 className="pl-3 italic opacity-50">
              Sin tratamiento este día.
            </h4>
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
        </div>
      </IonContent>
    </IonPage>
  )
}
