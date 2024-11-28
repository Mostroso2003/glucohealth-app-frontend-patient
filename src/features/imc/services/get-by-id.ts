import { axiosClient } from '~/shared/api'
import { IMC_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { Imc } from '~/shared/types/imc'
import { HttpStatusCode } from 'axios'

export async function getImcByPatientId(patientId: number) {
  const res = await axiosClient.get<BackendResponse<Imc>>(
    IMC_BACKEND_URL,
    {
      params: {
        patientId,
      },
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  console.log(res)

  return res.data.data
}




