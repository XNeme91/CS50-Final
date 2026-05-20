import { getAccessToken } from "./oauth"

let userId = null

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

export async function getUserId() {
  const data = await fetchUserData()
  userId = data?.data?.Viewer?.id || null
  return userId
}

export async function fetchUserAnimeList() {
  if (!userId) {
    await getUserId()
  }

  const query = `
    query ($userId: Int, $type: MediaType) {
    MediaListCollection (userId: $userId, type: $type) {
      lists {
        name
        entries {
          id
          media {
            id
            title {
              english
              native
              romaji
            }
          }
        }
      }
    }
  }
    `
  const variables = {
    userId,
    type: 'ANIME'
  }
  const data = await authorizedFetch(query, variables)
  console.log('User anime list:', data)
  return data
}