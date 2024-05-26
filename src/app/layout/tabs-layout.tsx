import {
  IonIcon,
  IonLabel,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react'
import { home, person, settings } from 'ionicons/icons'
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
        <IonTabButton tab="settings" href={ROUTES.APP.SETTINGS.PATH}>
          <IonIcon aria-hidden="true" icon={pill_svg}/>
          <IonLabel>Tratamiento</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  )
}
