import {
  IonInput,
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonText,
  useIonLoading,
  useIonAlert,
} from '@ionic/react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router'
import { ROUTES } from '~/shared/constants/routes'
import { CompleteProfileDto } from '~/features/patients/dto/complete-profile'
import { completeProfileSchema } from '~/features/patients/schemas/complete-profile'
import { useMutation } from '@tanstack/react-query'
import { updateOwnProfileService } from '~/features/patients/services/update-own-profile'
import { UpdateProfileDto } from '~/features/patients/dto/update-profile'
import { useStore } from '~/shared/store/store'

const INITIAL_BIRTHDATE_VALUE = new Date('1990-01-01').toISOString()

export function Form() {
  const history = useHistory()

  const user = useStore(state => state.user!)

  const [presentAlert] = useIonAlert()
  const [presentLoading, dismissLoading] = useIonLoading()

  const updateProfileMutation = useMutation({
    mutationFn: (values: UpdateProfileDto) => {
      return updateOwnProfileService(values)
    },
    onMutate: () => {
      presentLoading()
    },
    onSuccess: async data => {
      history.replace(ROUTES.APP.PATH)
    },
    onError: e => {
      presentAlert(e.message)
    },
    onSettled: () => {
      dismissLoading()
    },
  })

  const { handleChange, handleSubmit, handleBlur, errors, touched, values } =
    useFormik<CompleteProfileDto>({
      initialValues: {
        fullName: '',
        phoneNumber: '',
        birthDate: INITIAL_BIRTHDATE_VALUE,
        weightInKg: 0,
        heightInCm: 0,
      },
      validationSchema: completeProfileSchema,
      onSubmit: values => {
        const updateProfileDto: UpdateProfileDto = {
          ...user,
          ...values,
          age:
            new Date().getFullYear() - new Date(values.birthDate).getFullYear(),
        }

        updateProfileMutation.mutate(updateProfileDto)
      },
    })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      onInput={handleChange}
      onBlur={handleBlur}
      className="flex flex-col justify-center items-center gap-5"
    >
      <IonInput
        name="fullName"
        fill="outline"
        label="Nombre Completo"
        errorText={errors.fullName}
        className={`max-w-xl ${errors.fullName ? 'ion-invalid' : ''} ${touched.fullName && 'ion-touched'}`}
        mode="md"
      />
      <IonInput
        name="phoneNumber"
        fill="outline"
        label="Número de Teléfono"
        errorText={errors.phoneNumber}
        className={`max-w-xl ${errors.phoneNumber ? 'ion-invalid' : ''} ${touched.phoneNumber && 'ion-touched'}`}
        mode="md"
      />

      <div className="flex w-full justify-evenly items-center">
        <IonText slot="time-target">Fecha de Nacimiento</IonText>
        <IonDatetimeButton datetime="birthDate"></IonDatetimeButton>

        <IonModal keepContentsMounted={true}>
          <IonDatetime
            id="birthDate"
            presentation="date"
            value={values.birthDate}
            onIonChange={e => {
              handleChange({
                target: {
                  name: 'birthDate',
                  value: (e.detail.value as string).split('T')[0],
                },
              })
            }}
            max={new Date().toISOString()}
          ></IonDatetime>
        </IonModal>
      </div>

      <IonInput
        name="weightInKg"
        fill="outline"
        label="Peso"
        errorText={errors.weightInKg}
        className={`max-w-xl ${errors.weightInKg ? 'ion-invalid' : ''} ${touched.weightInKg && 'ion-touched'}`}
        mode="md"
      >
        <span slot="end">kg</span>
      </IonInput>
      <IonInput
        name="heightInCm"
        fill="outline"
        label="Altura"
        errorText={errors.heightInCm}
        className={`max-w-xl ${errors.heightInCm ? 'ion-invalid' : ''} ${touched.heightInCm && 'ion-touched'}`}
        mode="md"
      >
        <span slot="end">cm</span>
      </IonInput>

      <IonButton type="submit">Guardar</IonButton>
    </form>
  )
}
