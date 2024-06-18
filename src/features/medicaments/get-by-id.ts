import { HttpStatusCode } from 'axios'
import { axiosClient } from '~/shared/api'
import { BackendResponse } from '~/shared/types/dto/backend-response'

interface MedicamentDto {
  id: number
  tradeName: string
  genericName: string
  description: string
  sideEffects: string[]
  presentations: string[]
}

const ENDPOINT_URL = `/medicament`

export async function getMedicamentById(id: number) {
  const res = await axiosClient.get<BackendResponse<MedicamentDto>>(
    ENDPOINT_URL,
    {
      params: {
        id,
      },
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  return res.data.data
}
