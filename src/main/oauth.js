import { shell, safeStorage } from 'electron'

let token

function loginWithAniList() {
  const clientId = import.meta.env.MAIN_VITE_CLIENT_ID
  const redirectUri = encodeURIComponent('animedoro://auth')

  const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

  shell.openExternal(authUrl)
}

async function exchangeCodeForToken(code) {
  const response = await fetch('https://anilist.co/api/v2/oauth/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      client_id: import.meta.env.MAIN_VITE_CLIENT_ID,
      client_secret: import.meta.env.MAIN_VITE_CLIENT_SECRET,
      redirect_uri: 'animedoro://auth',
      code: code
    })
  })

  const data = await response.json()

  token = data.access_token
  token = safeStorage.encryptString(token)
  console.log('Access token:', token)
}

function getToken() {
  return token;
}


export { exchangeCodeForToken, loginWithAniList, getToken }