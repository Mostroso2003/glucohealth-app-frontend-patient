import {
  writeToLocalStorage,
  removeFromLocalStorage,
  readFromLocalStorage,
} from '~/shared/utils/local-storage'
import { axiosClient } from '~/shared/api'
import { LoginDto } from '../dto/login'
import { loginService } from '../services/login'
import { useStore } from '~/shared/store/store'
import { User } from '~/shared/types/user'
import OneSignal from 'react-onesignal'

const TOKEN_KEY = 'token'
const USER_INFO_KEY = 'user'

export async function login({ email, password }: LoginDto) {
  const { user, token } = await loginService({ email, password })

  writeToLocalStorage(USER_INFO_KEY, user)
  writeToLocalStorage(TOKEN_KEY, token)

  axiosClient.defaults.headers.Authorization = `Bearer ${token}`

  useStore.getState().login(user, token)

  await OneSignal.login(String(user.id))

  return user
}

export function logout() {
  removeFromLocalStorage(USER_INFO_KEY)
  removeFromLocalStorage(TOKEN_KEY)

  axiosClient.defaults.headers.Authorization = ''

  OneSignal.logout()

  useStore.getState().logout()
}

export function loginFromLocalStorage() {
  const user = readFromLocalStorage<User>(USER_INFO_KEY)
  const token = readFromLocalStorage<string>(TOKEN_KEY)

  if (!user || !token) {
    removeFromLocalStorage('user')
    removeFromLocalStorage('token')

    throw new Error(
      'Missing login information. User data or token not found in Local Storage.',
    )
  }

  axiosClient.defaults.headers.Authorization = `Bearer ${token}`

  useStore.getState().login(user, token)

  OneSignal.login(String(user.id))

  return user
}
