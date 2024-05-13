import { HttpStatusCode } from 'axios'
import { axiosClient } from '~/shared/api'
import { BackendResponse } from '~/shared/types/dto/backend-response'
import { LoginResponseDto } from '../dto/login-response'
import { LoginDto } from '../dto/login'

const LOGIN_BACKEND_URL = '/auth/login'

export async function loginService(loginDto: LoginDto) {
  const res = await axiosClient.post<BackendResponse<LoginResponseDto>>(
    LOGIN_BACKEND_URL,
    loginDto,
    {
      validateStatus: status => status === HttpStatusCode.Ok,
    },
  )

  return res.data.data
}
