import { axiosClient } from '~/shared/api'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { HttpStatusCode } from 'axios'
import { getMedicamentById } from '~/features/medicaments/get-by-id'

interface TreatmentDto {
  medicamentId: number
  dose: string
  schedule: {
    expectedTakingTimestamp: string
    actualTakingTimestamp: string
  }[]
}

export async function getOwnPatientTreatmentByDate(dateString: string) {
  const ENDPOINT_URL = `/patients/me/treatment/schedules/${dateString}`

  const res = await axiosClient.get<BackendResponse<TreatmentDto[]>>(
    ENDPOINT_URL,
    {
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  const formattedData = await Promise.all(
    res.data.data.map(async treatment => {
      const medicament = await getMedicamentById(treatment.medicamentId)

      return {
        medicament,
        dose: treatment.dose,
        schedule: treatment.schedule.map(schedule => ({
          expectedTakingTimestamp: new Date(schedule.expectedTakingTimestamp),
          actualTakingTimestamp: schedule.actualTakingTimestamp
            ? new Date(schedule.actualTakingTimestamp)
            : null,
        })),
      }
    }),
  )

  return formattedData
}
