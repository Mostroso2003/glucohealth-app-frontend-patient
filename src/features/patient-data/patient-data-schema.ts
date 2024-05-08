import { number, object, string } from 'yup'

export const patientDataSchema = object({
  fullname: string().required('El correo electrónico es requerido'),
  phoneNumber: string().matches(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/).required('El número de teléfono es requerido'),
  birthDate: string().required('La fecha de nacimiento es requerida'),
  weight: number().required('El peso es requerido').positive('Ingrese una cantidad positiva'),
  height: number().required('La altura es requerida').positive('Ingrese una cantidad positiva'),
})
