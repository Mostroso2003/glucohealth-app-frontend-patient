import { AES, enc } from 'crypto-js'
import { AES_KEY } from '~/shared/config'

export function encrypt(message: string) {
  let encJson = AES.encrypt(JSON.stringify(message), AES_KEY).toString()
  let encData = enc.Base64.stringify(enc.Utf8.parse(encJson))
  return encData
}

export function decrypt(cipherText: string) {
  let decData = enc.Base64.parse(cipherText).toString(enc.Utf8)
  let bytes = AES.decrypt(decData, AES_KEY).toString(enc.Utf8)
  return JSON.parse(bytes)
}
