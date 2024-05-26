import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonText,
  IonContent,
  IonCard,
  IonCardHeader,
  IonIcon,
  IonCardContent,
  IonButton,
  IonCheckbox,
  IonItemDivider,
} from '@ionic/react'
import { WeekDays } from './components/week-days'
import { MedicationCard } from '~/shared/components/medication-card'

export function DashboardPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Hoy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <WeekDays />

        <IonText className="">
          <h1 className="ml-2 text-xl font-bold">Medicaciones por tomar</h1>
        </IonText>

        <MedicationCard
          medication={{
            medicament: 'Loratadina',
            dosage: '10 mg',
            time: '9:30',
          }}
        />
      </IonContent>
    </IonPage>
  )
}
