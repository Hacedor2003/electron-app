/* eslint-disable prettier/prettier */
import { is } from '@electron-toolkit/utils'
import { BrowserWindow, ipcMain, shell } from 'electron'
import { join } from 'path'
import icon from '../../resources/icon.png?asset'

export default class MainScreen {
  window

  position = {
    width: 1000,
    height: 600,
    maximized: false
  }

  constructor() {
    this.window = new BrowserWindow({
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

    this.window.on('ready-to-show', () => {
      this.window.show()
    })
    
    this.window.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
    
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.window.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
      this.window.loadFile(join(__dirname, '../renderer/index.html'))
    }

    this.handleMessages()
  }

  showMessage(message):void {
    console.log('showMessage trapped')
    console.log(message)
    this.window.webContents.send('updateMessage', message)
  }

  close():void {
    this.window.close()
    ipcMain.removeAllListeners()
  }

  hide():void {
    this.window.hide()
  }

  handleMessages():void {
    //Ipc functions go here.
  }
}

module.exports = MainScreen
