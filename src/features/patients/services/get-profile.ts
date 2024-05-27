import { axiosClient } from '~/shared/api'
import { OWN_PATIENT_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { Patient } from '~/shared/types/patient'
import { HttpStatusCode } from 'axios'

export async function getOwnProfile() {
  const res = await axiosClient.get<BackendResponse<Patient>>(
    OWN_PATIENT_BACKEND_URL,
    {
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  return res.data.data
}
