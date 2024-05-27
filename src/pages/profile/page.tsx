import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonChip,
  useIonLoading,
  IonIcon,
  IonButton,
  IonAlert,
} from '@ionic/react'
import { callOutline, logOutOutline, mailOutline } from 'ionicons/icons'
import { useQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '~/features/patients/constants'
import { getOwnProfile } from '~/features/patients/services/get-profile'
import { LogoutButton } from './components/logout-button'

export function ProfilePage() {
  const data = {
    id: 0,
    fullName: 'Aurimart García',
    email: 'user@example.com',
    phoneNumber: '04164897034',
    nationalId: '29907053',
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
            <section className="mt-5 w-screen pl-3">
              <h2 className="text-lg font-bold mb-1">Número de teléfono</h2>
              <p>
                <IonIcon
                  icon={callOutline}
                  color="current"
                  className="mr-2"
                ></IonIcon>
                {data.phoneNumber}
              </p>
              <h2 className="text-lg font-bold mb-1 mt-7">
                Correo electrónico
              </h2>
              <p>
                <IonIcon
                  icon={mailOutline}
                  color="current"
                  className="mr-2"
                ></IonIcon>
                {data.email}
              </p>
            </section>
            <section className="mt-40">
              <LogoutButton />
            </section>
          </main>
        </IonContent>
      </IonPage>
    </>
  )
}
