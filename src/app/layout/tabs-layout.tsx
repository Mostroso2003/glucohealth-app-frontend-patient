import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { home, person } from 'ionicons/icons'
import pill_svg from '~/shared/assets/pill.svg'
import { ROUTES } from '~/shared/constants/routes'

interface Props {
  children: React.ReactNode
}

export function TabsLayout({ children }: Props) {
  return (
    <IonTabs>
      {children}

      <IonTabBar slot="bottom">
        <IonTabButton tab="dashboard" href={ROUTES.APP.DASHBOARD.PATH}>
          <IonIcon aria-hidden="true" icon={home} />
          <IonLabel>Panel</IonLabel>
        </IonTabButton>
        <IonTabButton tab="treatment" href={ROUTES.APP.TREATMENT.PATH}>
          <IonIcon aria-hidden="true" icon={pill_svg}/>
          <IonLabel>Tratamiento</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href={ROUTES.APP.PATIENT.PATH}>
          <IonIcon aria-hidden="true" icon={person}/>
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
