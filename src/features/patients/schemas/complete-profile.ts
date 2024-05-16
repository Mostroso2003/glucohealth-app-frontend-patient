import { number, object, string } from 'yup'

export const completeProfileSchema = object({
  fullName: string().required('El correo electrónico es requerido'),
  phoneNumber: string().required('El número de teléfono es requerido'),
  birthDate: string().required('La fecha de nacimiento es requerida'),
  weightInKg: number()
    .required('El peso es requerido')
    .positive('Ingrese una cantidad positiva'),
  heightInCm: number()
    .required('La altura es requerida')
    .positive('Ingrese una cantidad positiva'),
})
