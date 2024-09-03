/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react'

function App(): JSX.Element {
  const [updateMessage, setUpdateMessage] = useState('')
  const [updateMessageResponse, setUpdateMessageResponse] = useState('')
  const [updateNotAvailable, setUpdateNotAvailable] = useState('')
  const [updateDownloades, setUpdateDownloades] = useState('')
  const [updateError, setUpdateError] = useState('')

  useEffect(() => {
    window.context
      .updateMessage()
      .then((response) => {
        setUpdateMessage(response)
      })
      .catch((error) => console.log(error))
    window.context
      .updateMessageResponse()
      .then((response) => {
        setUpdateMessageResponse(response)
      })
      .catch((error) => console.log(error))
    window.context
      .updateNotAvailable()
      .then((response) => {
        setUpdateNotAvailable(response)
      })
      .catch((error) => console.log(error))
    window.context
      .updateDownloades()
      .then((response) => {
        setUpdateDownloades(response)
      })
      .catch((error) => console.log(error))
    window.context
      .updateError()
      .then((response) => {
        setUpdateError(response)
      })
      .catch((error) => console.log(error))
  }, [updateMessage, updateMessageResponse, updateNotAvailable, updateDownloades, updateError])

  return (
    <>
      <h1>Hola Mundo</h1>
      <p>Esto es una prueba del update</p>
      <p>Version 1.7.0</p>
      <p>Mensaje update: {updateMessage}</p>
      <p>Mensaje response: {updateMessageResponse}</p>
      <p>Mensaje no disponible: {updateNotAvailable}</p>
      <p>Mensaje descarga: {updateDownloades}</p>
      <p>Mensaje error: {updateError}</p>
    </>
  )
}

export default App
