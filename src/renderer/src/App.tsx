import { useState } from 'react'

/* eslint-disable prettier/prettier */
function App(): JSX.Element {
  const [mensaje, setMensaje] = useState('')
  
  window.context
      .updateMessage()
      .then((response) => {
        setMensaje(response)
      })
      .catch((error) => console.log(error))

  return (
    <>
      <h1>Hola Mundo</h1>
      <p>Esto es una prueba del update</p>
      <p>Version 1.7.0</p>
      <p>Mensaje prueba: {mensaje}</p>
    </>
  )
}

export default App
