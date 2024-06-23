import { Treatment } from './treatment'
import { User } from './user'

export interface Patient extends User {
  age: number
  weightInKg: number
  heightInCm: number
  bmi: number
  treatment: Treatment
}
