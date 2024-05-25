import { IonPage, IonContent, IonText } from '@ionic/react'
import { LoginForm } from './components/login-form'
import logo from '~/shared/assets/logo.png'
import darkLogo from '~/shared/assets/logo-dark.png'

export function LoginPage() {
  let isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches

  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="w-full h-full flex justify-center items-center flex-col gap-5 px-5">
          <IonText className="text-center flex flex-col items-center">
            {isDarkMode ? (
              <img
                src={darkLogo}
                alt="GlucoHealth"
                className="w-[90%] max-w-xl"
              />
            ) : (
              <img src={logo} alt="GlucoHealth" className="w-[90%] max-w-xl" />
            )}

            <h2>Bienvenido, paciente</h2>
          </IonText>

          <LoginForm />
        </main>
      </IonContent>
    </IonPage>
  )
}
