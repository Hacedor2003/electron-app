import { electronApp, optimizer } from '@electron-toolkit/utils'
import { app, BrowserWindow, ipcMain } from 'electron'
import { autoUpdater } from 'electron-updater'
import MainScreen from './MainScreen'

let mainWindow

autoUpdater.autoDownload = false
autoUpdater.autoInstallOnAppQuit = true

function createWindow(): void {
  mainWindow = new MainScreen()
}

app.whenReady().then(() => {
  createWindow()
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  autoUpdater.checkForUpdates()
  ipcMain.handle('updateMessage', () => `Checking for updates. Current version ${app.getVersion()}`)
  console.log(`Checking for updates. Current version ${app.getVersion()}`)

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

autoUpdater.on('update-available', () => {
  ipcMain.handle('updateMessage', () => `Update available. Current version ${app.getVersion()}`)
  console.log(`Update available. Current version ${app.getVersion()}`)
  const pth = autoUpdater.downloadUpdate()
  ipcMain.handle('updateMessage', () => pth)
  console.log(pth)
})

autoUpdater.on('update-not-available', () => {
  ipcMain.handle('updateMessage', () => `No update available. Current version ${app.getVersion()}`)
  console.log(`No update available. Current version ${app.getVersion()}`)
})

autoUpdater.on('update-downloaded', () => {
  ipcMain.handle('updateMessage', () => `Update downloaded. Current version ${app.getVersion()}`)
  console.log(`Update downloaded. Current version ${app.getVersion()}`)
})

autoUpdater.on('error', (info) => {
  ipcMain.handle('updateMessage', () => info)
  console.log(info)
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
