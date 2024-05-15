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
import ExploreContainer from '~/shared/components/ExploreContainer'
import { MedicationCard } from './components/medication-card'
import { WeekDays } from './components/week-days'

export function DashboardPage() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">Hoy</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <WeekDays/>

        <IonText className="">
          <h2 className="ml-2">Medicaciones por tomar</h2>
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
