import { axiosClient } from '~/shared/api'
import { PATIENTS_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { Patient } from '~/shared/types'
import { PreregisterDto } from '../dto/preregister'
import { HttpStatusCode } from 'axios'

export async function preregisterPatient(preregisterDto: PreregisterDto) {
  const res = await axiosClient.post<
    BackendResponse<Patient & { password: string }>
  >(PATIENTS_BACKEND_URL, preregisterDto, {
    validateStatus: status => status === HttpStatusCode.Created,
  })

  return res.data.data
}
