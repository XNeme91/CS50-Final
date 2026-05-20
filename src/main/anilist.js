import { getAccessToken } from "./oauth"

export function getDecryptedToken() {
  const token = getAccessToken()
  if (!token) {
    console.log('No token available')
    return null
  }
  return token
}

export async function authorizedFetch(query, variables = {}) {
  const token = getDecryptedToken()
  if (!token) {
    console.error('No access token available')
    return null
  }

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({
      query,
      variables
    })
  })

  return response.json()
}

export async function fetchUserData() {
  const query = `
    query {
      Viewer {
        id
        name
        avatar {
          large
        }
      }
    }
  `
  const data = await authorizedFetch(query)
  console.log('Viewer data:', data)
  return data
}