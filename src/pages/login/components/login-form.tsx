import {
  IonInput,
  IonInputPasswordToggle,
  IonButton,
  useIonAlert,
  useIonLoading,
} from '@ionic/react'
import { useFormik } from 'formik'
import { useHistory } from 'react-router'
import { ROUTES } from '~/shared/constants/routes'
import { LoginDto } from '~/features/auth/dto/login'
import { loginSchema } from '~/features/auth/schemas/login'
import { useMutation } from '@tanstack/react-query'
import { login } from '~/features/auth/model/auth'

export function LoginForm() {
  const history = useHistory()

  const [presentAlert] = useIonAlert()
  const [presentLoading, dismissLoading] = useIonLoading()

  const loginMutation = useMutation({
    mutationFn: async ({ email, password }: LoginDto) => {
      return await login({ email, password })
    },
    onMutate: () => {
      presentLoading()
    },
    onSuccess: async data => {
      // If user don't have his full name stored in database, need to complete his profile
      if (!data.fullName) {
        history.push(ROUTES.LOGIN.COMPLETE_PROFILE.PATH)
      } else {
        history.push(ROUTES.APP.PATH)
      }
    },
    onError: e => {
      presentAlert(e.message)
    },
    onSettled: () => {
      dismissLoading()
    },
  })

  const { handleChange, handleSubmit, handleBlur, errors, touched } =
    useFormik<LoginDto>({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: loginSchema,
      onSubmit: values => {
        loginMutation.mutate(values)
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
        name="email"
        fill="outline"
        label="Correo Electrónico"
        type="email"
        errorText={errors.email || 'placeholder'}
        className={`max-w-xl ${errors.email ? 'ion-invalid' : ''} ${touched.email && 'ion-touched'}`}
        mode="md"
      />
      <IonInput
        name="password"
        fill="outline"
        label="Contraseña"
        type="password"
        errorText={errors.password || 'placeholder'}
        className={`max-w-xl ${errors.password ? 'ion-invalid' : ''} ${touched.password && 'ion-touched'}`}
        mode="md"
      >
        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
      </IonInput>
      <IonButton id="login-form-submit-button" type="submit" color="primary">
        Iniciar Sesión
      </IonButton>
    </form>
  )
}
