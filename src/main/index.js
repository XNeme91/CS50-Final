import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join, resolve } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import { exchangeCodeForToken, loginWithAniList, deleteAccessToken } from './oauth'
import * as anilist from './anilist'
import './anilist'

let mainWindow

// Register custom protocol
// Anytime animedoro:// is entered in browser, it'll open up here
if (process.defaultApp) {
  if (process.argv.length >= 2) {
    app.setAsDefaultProtocolClient('animedoro', process.execPath, [resolve(process.argv[1])])
  } else {
    app.setAsDefaultProtocolClient('animedoro')
  }
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('anilist', () => console.log('anilist'))

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Windows and Linux handle protocol
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }

    const parsed = new URL(commandLine.pop())
    console.log(parsed)

    const code = parsed.searchParams.get('code')
    console.log('Authorization code:', code)

    exchangeCodeForToken(code)
  })

  app.whenReady().then(() => {
    createWindow()
  })
}

// MacOS handle protocol
app.whenReady().then(() => {
  createWindow()
})

app.on('open-url', (event, url) => {
    const parsed = new URL(url)
    console.log(parsed)

    const code = parsed.searchParams.get('code')
    console.log('Authorization code:', code)

    exchangeCodeForToken(code)
});


// Handle IPC calls from renderer
app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  ipcMain.handle('anilist', () => 'user wants to login to anilist')
  ipcMain.handle('loginWithAniList', () => {loginWithAniList()})
  ipcMain.handle('getDecryptedToken', () => anilist.getDecryptedToken())
  ipcMain.handle('deleteAccessToken', () => {anilist.deleteAccessToken()})
  ipcMain.handle('getViewerData', () => anilist.fetchUserData())
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
