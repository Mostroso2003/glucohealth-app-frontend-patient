import { object, string } from 'yup'

export const patientPreregisterSchema = object({
  email: string()
    .email('Debe de ser un correo electrónico válido')
    .required('El correo electrónico es requerido'),
  nationalId: string().required('El N.U.I. es requerido'),
})
