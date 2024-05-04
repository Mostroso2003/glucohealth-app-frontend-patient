import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonText,
  IonChip,
  IonLoading,
  useIonLoading,
} from '@ionic/react'
import { useQuery } from '@tanstack/react-query'
import { useLocation } from 'react-router'
import { QUERY_KEYS } from '~/features/patients/constants'
import { getPatientById } from '~/features/patients/services/get-by-id'

export function PatientPage() {
  const [present, dismiss] = useIonLoading()

  const { search } = useLocation()

  const searchParams = new URLSearchParams(search)

  const id = searchParams.get('id')

  if (!id) {
    //TODO: REDIRECT
    return <h1>Error...</h1>
  }

  const { data, isPending, isFetching, isError } = useQuery({
    queryKey: [QUERY_KEYS.PATIENT_DATA],
    queryFn: () => getPatientById(id),
  })

  if (isPending || isFetching)
    return <IonLoading isOpen={isPending || isFetching} />

  if (isError) return <h1>Error...</h1>

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Paciente</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <main className="flex flex-col w-full h-full pt-7 px-4 items-center">
            <IonText className="text-center flex flex-col gap-2 text-balance">
              <h1 className="font-semibold my-0 text-3xl">{data.fullName}</h1>
              <h2 className="text-xl my-0">NUI - {data.nationalId}</h2>
            </IonText>

            <IonChip className="w-[fit-content] mt-5 text-lg">
              {data.age} 58 años
            </IonChip>

            <section className="flex w-full justify-evenly">
              <div>
                <IonText>
                  <h3>Peso</h3>
                  <p>{data.weightInKg} 67 kg</p>
                </IonText>
              </div>
              <div>
                <IonText>
                  <h3>Altura</h3>
                  <p>{data.heightInCm} 165 cm</p>
                </IonText>
              </div>
              <div>
                <IonText>
                  <h3>IMC</h3>
                  {/* TODO: PUT IMC */}
                  <p>24.6</p>
                </IonText>
              </div>
            </section>

            <section className="w-full mt-6">
              <IonText className="text-lg text-left font-medium">
                <h2>Tratamiento</h2>
              </IonText>
            </section>
          </main>
        </IonContent>
      </IonPage>
    </>
  )
}
