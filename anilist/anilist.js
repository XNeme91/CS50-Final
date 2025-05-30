const loginBtn = document.getElementById('login-btn')
const animeListContainer = document.getElementById('anime-list')

async function fetchAnimeList(token) {
  const query = `
    query {
      Viewer {
        name
        mediaListOptions {
          scoreFormat
        }
        mediaListCollection(type: ANIME, status: CURRENT) {
          lists {
            name
            entries {
              media {
                title {
                  romaji
                }
                coverImage {
                  medium
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch('https://graphql.anilist.co', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query })
  })

  const result = await response.json()
  displayAnimeList(result.data.Viewer.mediaListCollection.lists)
}

function displayAnimeList(lists) {
  animeListContainer.innerHTML = ''

  lists.forEach(list => {
    const section = document.createElement('div')
    section.innerHTML = `<h3>${list.name}</h3>`

    list.entries.forEach(entry => {
      const media = entry.media
      const div = document.createElement('div')
      div.innerHTML = `
        <img src="${media.coverImage.medium}" alt="${media.title.romaji}" />
        <p>${media.title.romaji}</p>
      `
      section.appendChild(div)
    })

    animeListContainer.appendChild(section)
  })
}
