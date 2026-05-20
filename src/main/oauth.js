import { app, shell, safeStorage } from 'electron'
import * as fs from 'fs'
import * as path from 'path'

const TOKEN_PATH = path.join(__dirname, 'token.bin')
let token = null

export function loginWithAniList() {
  const clientId = import.meta.env.MAIN_VITE_CLIENT_ID
  const redirectUri = encodeURIComponent('animedoro://auth')

  const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code`

  shell.openExternal(authUrl)
}

export async function exchangeCodeForToken(code) {
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
  saveAccessToken(token)
  console.log('Access token received')
}

export function saveAccessToken(token) {
  const encrypted = safeStorage.encryptString(token)
  fs.writeFileSync(TOKEN_PATH, encrypted)
}

export function getAccessToken() {
  if (!fs.existsSync(TOKEN_PATH)) {
    console.log('No token file found')
    return null
  }

  const encrypted = fs.readFileSync(TOKEN_PATH)
  return safeStorage.decryptString(encrypted)
}

export function deleteAccessToken() {
  if (fs.existsSync(TOKEN_PATH)) {
    fs.unlinkSync(TOKEN_PATH)
  }
}

