const { app, BrowserWindow, ipcMain, session } = require('electron/main')
const path = require('node:path')
const axios = require('axios')

require('dotenv').config()

let mainWindow
let aniListWindow

const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI

// Creates new main window
function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 500,
    height: 500,
    title: 'Animedoro Timer',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  })

  mainWindow.loadFile('index.html')
}


function createAniListWindow() {
  aniListWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: 'AniList Window',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
    }
  })

  aniListWindow.loadFile(path.join(__dirname, 'anilist/index.html'))
}

app.whenReady().then(() => {
  createMainWindow()
  
  ipcMain.handle('open-anilist-window', () => {
    if (!aniListWindow || aniListWindow.isDestroyed()) {
      createAniListWindow()
      } else {
      aniListWindow.focus()
    }
  })

  ipcMain.handle('oauth-login', async () => {
    return new Promise((resolve, reject) => {
      const authWin = new BrowserWindow({
        width: 500,
        height: 600,
        show: true,
        webPreferences: { nodeIntegration: false }
      })

      const authUrl = `https://anilist.co/api/v2/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${REDIRECT_URI}`

      authWin.loadURL(authUrl)
      const filter = { urls: ['http://localhost:3000/*'] }

      session.defaultSession.webRequest.onBeforeRequest(filter, async (details, callback) => {
        const url = new URL(details.url)
        const code = url.searchParams.get('code')

        if (code) {
          authWin.close()
          try {
            const response = await axios.post('https://anilist.co/api/v2/oauth/token', {
              grant_type: 'authorization_code',
              client_id: CLIENT_ID,
              client_secret: CLIENT_SECRET,
              redirect_uri: REDIRECT_URI,
              code: code
            })
            resolve(response.data)
          } catch(err) {
            reject(err)
          }
        }
        callback({ cancel: false })
      })
    })
  })

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createMainWindow()
    }
  })
})

// Close app when all windows are closed
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})