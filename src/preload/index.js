import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  ping: () => ipcRenderer.invoke('ping'),
  anilist: () => ipcRenderer.invoke('anilist'),
  login: () => ipcRenderer.invoke('loginWithAniList'),
  logout: () => ipcRenderer.invoke('deleteAccessToken'),  
  getToken: () => ipcRenderer.invoke('getDecryptedToken'),
  getViewer: () => ipcRenderer.invoke('getViewerData'),
  getUserId: () => ipcRenderer.invoke('getUserId'),
  getAnimeList: () => ipcRenderer.invoke('fetchUserAnimeList'),
  openGitHub: () => ipcRenderer.invoke('openGitHub')
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  window.electron = electronAPI
  window.api = api
}
