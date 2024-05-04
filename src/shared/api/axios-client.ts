import axios from 'axios'
import { BACKEND_BASE_URL } from '~/shared/config'

export const axiosClient = axios.create({
  baseURL: BACKEND_BASE_URL,
  responseType: 'json',
})
