import { object, string } from 'yup'

export const loginSchema = object({
  email: string()
    .email('Debe de ser un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  password: string().required('La contraseña es requerida'),
})
