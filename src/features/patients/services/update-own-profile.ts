import { axiosClient } from '~/shared/api'
import { OWN_PATIENT_BACKEND_URL } from '../constants'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { Patient } from '~/shared/types/patient'
import { HttpStatusCode } from 'axios'
import { UpdateProfileDto } from '../dto/update-profile'

export async function updateOwnProfileService(
  updateProfileDto: UpdateProfileDto,
) {
  const res = await axiosClient.put<BackendResponse<Patient>>(
    OWN_PATIENT_BACKEND_URL,
    updateProfileDto,
    {
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  return res.data.data
}
