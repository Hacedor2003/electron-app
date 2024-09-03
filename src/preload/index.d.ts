/* eslint-disable prettier/prettier */
import { ElectronAPI } from '@electron-toolkit/preload'

declare global {
  interface Window {
    electron: ElectronAPI
    api: unknown
    context: {
      updateMessage: () => Promise<string>
      updateMessageResponse: () => Promise<string>
      updateNotAvailable: () => Promise<string>
      updateDownloades: () => Promise<string>
      updateError: () => Promise<string>
    }
  }
}
