import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonDatetime,
  IonText,
} from '@ionic/react'
import { MedicationCard } from '~/shared/components/medication-card'

export function SettingsPage() {
  let isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Tratamiento</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className={`flex justify-center ${isDarkMode ? 'bg-bg-datetime-customized-color-dark' : 'bg-bg-datetime-customized-color-light'}`}>
          <IonDatetime
            mode="ios"
            id="treatmentDay"
            presentation="date"
            max={new Date().toISOString()}
          ></IonDatetime>
        </div>

        <IonText className="">
          <h1 className="ml-2 text-xl font-bold">Medicaciones</h1>
        </IonText>
        <div>
          <MedicationCard
            medication={{
              medicament: 'Loratadina',
              dosage: '10 mg',
              time: '9:30pm',
            }}
          />
          <MedicationCard
            medication={{
              medicament: 'Loratadina',
              dosage: '10 mg',
              time: '9:30am',
            }}
          />
          <MedicationCard
            medication={{
              medicament: 'Loratadina',
              dosage: '10 mg',
              time: '9:30am',
            }}
          />
          <MedicationCard
            medication={{
              medicament: 'Loratadina',
              dosage: '10 mg',
              time: '9:30am',
            }}
          />
          <MedicationCard
            medication={{
              medicament: 'Loratadina',
              dosage: '10 mg',
              time: '9:30am',
            }}
          />
          <MedicationCard
            medication={{
              medicament: 'Loratadina',
              dosage: '10 mg',
              time: '9:30am',
            }}
          />
        </div>
      </IonContent>
    </IonPage>
  )
}
