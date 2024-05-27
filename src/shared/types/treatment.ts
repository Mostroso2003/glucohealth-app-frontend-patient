export interface Treatment {
  id: number
  medicaments: TreatmentMedicament[]
}

export interface TreatmentMedicament {
  medicamentId: number
  takingSchedulesStartingTimestamp: string
  takingSchedulesEndingTimestamp?: string
  takingSchedules: {
    takingSchedule: string
  }[]
}
