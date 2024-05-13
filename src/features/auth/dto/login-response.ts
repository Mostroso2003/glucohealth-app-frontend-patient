import { User } from '~/shared/types/user'

export interface LoginResponseDto {
  token: string
  user: User
}
