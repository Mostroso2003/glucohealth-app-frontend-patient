import { IonAlert, IonButton, IonIcon } from '@ionic/react'
import { logOutOutline } from 'ionicons/icons'

export function LogoutButton() {
  return (
    <>
      <IonButton id="log-out">
        Cerrar sesión
        <IonIcon
          icon={logOutOutline}
          color="current"
          className="ml-2"
        ></IonIcon>
      </IonButton>
      <IonAlert
        header="¿Está seguro de cerrar su sesión?"
        message="Será redirigido al inicio de sesión"
        trigger="log-out"
        buttons={[
          {
            text: 'Continuar',
            role: 'confirm',
            handler: () => {
              console.log('Alert confirmed')
            },
          },
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Alert canceled')
            },
          },
        ]}
      ></IonAlert>
    </>
  )
}
