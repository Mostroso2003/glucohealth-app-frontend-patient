import { IonPage, IonContent, IonText } from '@ionic/react'

import { LoginForm } from './components/login-form'

export function LoginPage() {
  return (
    <IonPage>
      <IonContent fullscreen>
        <main className="w-full h-full flex justify-center items-center flex-col gap-5 px-5">
          <IonText className="text-center">
            <h1 className="text-4xl">GlucoHealth</h1>
            <h2>Bienvenido, enfermero/a</h2>
          </IonText>

          <LoginForm />
        </main>
      </IonContent>
    </IonPage>
  )
}
