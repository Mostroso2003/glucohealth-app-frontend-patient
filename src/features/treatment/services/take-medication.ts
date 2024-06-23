import { axiosClient } from '~/shared/api'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { HttpStatusCode } from 'axios'
import { getOwnProfile } from '~/features/patients/services/get-profile'

export interface TakeMedicationDto {
  treatmentId: number
  medicamentId: number
  takingTimestamp: string
}

interface Response {
  id: number
  patientId: number
  treatmentId: number
  medicamentId: number
  takingTimestamp: string
}

const ENDPOINT_URL = `/patients/me/medicaments-taken`

export async function takeMedication(
  takeMedicationDto: Omit<TakeMedicationDto, 'treatmentId'>,
) {
  const profile = await getOwnProfile()
  const { id: treatmentId } = profile.treatment

  const res = await axiosClient.post<BackendResponse<Response>>(
    ENDPOINT_URL,
    { ...takeMedicationDto, treatmentId },
    {
      validateStatus: status => status === HttpStatusCode.Created,
    },
  )

  return res.data.data
}
