const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('api', {
  openAniListWindow: () => ipcRenderer.invoke('open-anilist-window'),
  loginWithAniList: () => ipcRenderer.invoke('oauth-login')
})
