import { IonPage, IonContent, IonText } from '@ionic/react'
import { LoginForm } from './components/login-form'
import logo from '~/shared/assets/logo.png'

export function LoginPage() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="w-full h-full flex justify-center items-center flex-col gap-5 px-5">
          <IonText className="text-center flex flex-col items-center">
            <img src={logo} alt="GlucoHealth" className="w-[90%] max-w-xl" />
            <h2>Bienvenido, paciente</h2>
          </IonText>

          <LoginForm />
        </main>
      </IonContent>
    </IonPage>
  )
}
