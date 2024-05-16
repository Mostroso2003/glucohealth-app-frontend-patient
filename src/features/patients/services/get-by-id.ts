import { axiosClient } from '~/shared/api'
import { PATIENT_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { Patient } from '~/shared/types/patient'
import { HttpStatusCode } from 'axios'

export async function getPatientById(id: string) {
  const res = await axiosClient.get<BackendResponse<Patient>>(
    PATIENT_BACKEND_URL,
    {
      params: {
        id,
      },
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  console.log(res)

  return res.data.data
}
