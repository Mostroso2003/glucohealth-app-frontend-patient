import { Patient } from '~/shared/types/patient'

export interface UpdateProfileDto extends Omit<Patient, 'bmi'> {}
