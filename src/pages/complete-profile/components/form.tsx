import {
  IonInput,
  IonButton,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonLabel,
  IonText,
} from '@ionic/react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router'
import { ROUTES } from '~/shared/constants/routes'
import { PatientDataDto } from '~/features/patient-data/dto/patient-data'
import { patientDataSchema } from '~/features/patient-data/patient-data-schema'

export function Form() {
  const history = useHistory()

  const { handleChange, handleSubmit, errors, touched, values } =
    useFormik<PatientDataDto>({
      initialValues: {
        fullname: '',
        phoneNumber: '',
        birthDate: '',
        weight: 0,
        height: 0,
      },
      onSubmit: values => {
        history.push(ROUTES.APP.PATH)
      },
      //validationSchema: patientDataSchema,
    })

  return (
    <form
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
      onInput={handleChange}
      className="flex flex-col justify-center items-center gap-5"
    >
      <IonInput
        name="fullname"
        fill="outline"
        label="Nombre Completo"
        errorText={errors.fullname}
        className={`max-w-xl ${errors.fullname ? 'ion-invalid' : ''} ${touched.fullname && 'ion-touched'}`}
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

      <>
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
      </>

      <IonInput
        name="weight"
        fill="outline"
        label="Peso"
        errorText={errors.weight}
        className={`max-w-xl ${errors.weight ? 'ion-invalid' : ''} ${touched.weight && 'ion-touched'}`}
        mode="md"
      />
      <IonInput
        name="height"
        fill="outline"
        label="Altura"
        errorText={errors.height}
        className={`max-w-xl ${errors.height ? 'ion-invalid' : ''} ${touched.height && 'ion-touched'}`}
        mode="md"
      />

      <IonButton type="submit">Guardar</IonButton>
    </form>
  )
}
