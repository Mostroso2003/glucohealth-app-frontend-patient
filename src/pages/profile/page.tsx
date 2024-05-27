import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonChip,
  IonIcon,
} from '@ionic/react'
import { callOutline, mailOutline } from 'ionicons/icons'
import { LogoutButton } from './components/logout-button'
import { useStore } from '~/shared/store/store'
import { logout } from '~/features/auth/model/auth'
import { useHistory } from 'react-router'

export function ProfilePage() {
  const user = useStore(state => state.user)

  const history = useHistory()

  const data = {
    id: user?.id,
    fullName: user?.fullName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    nationalId: user?.nationalId,
    age: 21,
    weightInKg: 49,
    heightInCm: 153,
    bmi: 12,
    treatments: [
      {
        id: 0,
        medicaments: [
          {
            medicamentId: 0,
            takingSchedulesStartingTimestamp: 'string',
            takingSchedulesEndingTimestamp: 'string',
            takingSchedules: [
              {
                takingSchedule: 'string',
              },
            ],
          },
        ],
      },
    ],
  }

  function logoutAndRedirect() {
    logout()
    history.push('/login')
  }

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Perfil</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <main className="flex flex-col w-full h-full pt-7 px-4 items-center max-w-3xl m-auto">
            <IonText className="text-center flex flex-col text-balance">
              {data.fullName ? (
                <h1 className="font-semibold my-0 text-2xl">{data.fullName}</h1>
              ) : (
                <h1 className="font-semibold my-0 text-2xl opacity-50">
                  Nombre sin registrar
                </h1>
              )}
              <h2 className="text-lg mt-0 text-text-color-step-400">
                CI - {data.nationalId}
              </h2>
            </IonText>

            {data.age ? (
              <IonChip className="w-[fit-content] font-bold" color="primary">
                {data.age} Años
              </IonChip>
            ) : (
              <IonChip className="w-[fit-content] mt-5 text-lg text-opacity-50">
                Edad sin registrar
              </IonChip>
            )}

            <section className="flex w-full justify-evenly">
              <div>
                <IonText className="text-center">
                  <h2 className="text-base text-text-color-step-400 mb-0">
                    Peso
                  </h2>
                  {data.weightInKg ? (
                    <p className="text-xl font-bold">{data.weightInKg} kg</p>
                  ) : (
                    <p className="opacity-50">Sin registrar</p>
                  )}
                </IonText>
              </div>
              <div>
                <IonText className="text-center">
                  <h2 className="text-base text-text-color-step-400 mb-0">
                    Altura
                  </h2>
                  {data.heightInCm ? (
                    <p className="text-xl font-bold">{data.heightInCm} cm</p>
                  ) : (
                    <p className="opacity-50">Sin registrar</p>
                  )}
                </IonText>
              </div>
              <div>
                <IonText className="text-center">
                  <h2 className="text-base text-text-color-step-400 mb-0">
                    IMC
                  </h2>
                  {data.bmi ? (
                    <p className="text-xl font-bold">{data.bmi.toFixed(1)}</p>
                  ) : (
                    <p className="opacity-50">Sin registrar</p>
                  )}
                </IonText>
              </div>
            </section>
            <section className="mt-5 w-screen px-5">
              <h2 className="text-lg font-bold mb-1">
                <IonIcon
                  icon={callOutline}
                  color="current"
                  className="mr-2"
                ></IonIcon>
                Número de teléfono
              </h2>
              <p>{data.phoneNumber}</p>
              <h2 className="text-lg font-bold mb-1 mt-7">
                <IonIcon
                  icon={mailOutline}
                  color="current"
                  className="mr-2"
                ></IonIcon>
                Correo electrónico
              </h2>
              <p>{data.email}</p>
            </section>
            <section className="mt-40">
              <LogoutButton onConfirm={logoutAndRedirect} />
            </section>
          </main>
        </IonContent>
      </IonPage>
    </>
  )
}
