/* eslint-disable prettier/prettier */
import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('context', {
      updateMessage: (...args) => ipcRenderer.invoke('updateMessage', ...args),
      updateMessageResponse: (...args) => ipcRenderer.invoke('updateMessageResponse', ...args),
      updateNotAvailable: (...args) => ipcRenderer.invoke('updateNotAvailable', ...args),
      updateDownloades: (...args) => ipcRenderer.invoke('updateDownloades', ...args),
      updateError: (...args) => ipcRenderer.invoke('updateError', ...args),
    })
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
