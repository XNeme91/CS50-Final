import { getAccessToken } from "./oauth"

function getDecryptedToken() {
  const token = getAccessToken()
  if (!token) {
    console.log('No token available')
    return null
  }
  return token
}

export { getDecryptedToken }
