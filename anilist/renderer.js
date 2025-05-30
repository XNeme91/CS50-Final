const fetch = require('node-fetch')

var query = `
{
  Viewer {
    id
    name
  }
}
`

document.getElementById('loginBtn').addEventListener('click', async () => {
  const result = await window.api.loginWithAniList()

  // Reference as to what it looks like
  // or whats contained by result
  document.getElementById('output').textContent = JSON.stringify(result, null, 2)

  // this shows the damn access token
  console.log(result.access_token)
})
