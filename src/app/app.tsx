import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'

import './theme/tailwind.css'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css'

/* Theme variables */
import './theme/theme.css'

/* Notifications */
import OneSignal from 'react-onesignal'

import { TabsLayout } from './layout/tabs-layout'
import {
  DashboardPage,
  LoginPage,
  CompleteProfilePage,
  TreatmentPage,
  ProfilePage,
} from '~/pages'
import { ROUTES } from '~/shared/constants/routes'
import Providers from './providers'
import { loginFromLocalStorage } from '~/features/auth/model/auth'
import { useEffect, useRef } from 'react'

setupIonicReact()

export const App: React.FC = () => {
  const alreadyInitializedOneSignal = useRef(false)

  try {
    const user = loginFromLocalStorage()

    // If user is already logged in, redirect outside login
    if (location.pathname === ROUTES.LOGIN.PATH) {
      // If user don't have his full name stored in database, need to complete his profile
      if (!user.fullName) {
        location.href = ROUTES.LOGIN.COMPLETE_PROFILE.PATH
      } else {
        location.href = ROUTES.APP.PATH
      }
    }
  } catch (e) {
    if (location.pathname !== ROUTES.LOGIN.PATH)
      location.href = ROUTES.LOGIN.PATH
  }

  useEffect(() => {
    if (alreadyInitializedOneSignal.current) return
    ;(async () => {
      await OneSignal.init({
        appId: import.meta.env.VITE_ONESIGNAL_APP_ID,
        allowLocalhostAsSecureOrigin: true,
      })
      await OneSignal.Slidedown.promptPush()
      alreadyInitializedOneSignal.current = true
    })()
  }, [])

  return (
    <Providers>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path={ROUTES.LOGIN.PATH} component={LoginPage} />

            <Route
              exact
              path={ROUTES.LOGIN.COMPLETE_PROFILE.PATH}
              component={CompleteProfilePage}
            />

            <Route path={ROUTES.APP.PATH}>
              <TabsLayout>
                <IonRouterOutlet>
                  <Route
                    exact
                    path={ROUTES.APP.DASHBOARD.PATH}
                    component={DashboardPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.TREATMENT.PATH}
                    component={TreatmentPage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.PATIENT.PATH}
                    component={ProfilePage}
                  />

                  <Route
                    exact
                    path={ROUTES.APP.PATIENT_DATA_FORM.PATH}
                    component={CompleteProfilePage}
                  />

                  <Redirect
                    exact
                    from={ROUTES.APP.PATH}
                    to={ROUTES.APP.DASHBOARD.PATH}
                  />
                </IonRouterOutlet>
              </TabsLayout>
            </Route>

            <Redirect exact from={ROUTES.ROOT} to={ROUTES.LOGIN.PATH} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </Providers>
  )
}
