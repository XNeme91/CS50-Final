import { getAccessToken } from "./oauth"

export function getDecryptedToken() {
  const token = getAccessToken()
  if (!token) {
    console.log('No token available')
    return null
  }
  return token
}
