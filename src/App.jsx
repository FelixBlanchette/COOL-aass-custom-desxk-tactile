import { useEffect } from 'react'
import './App.css'
import WebSocketClient from './assets/scripts/WebSocketClient'
import { WS_COMMANDS } from './assets/scripts/webSocketCommands'

function App() {
  let webSocketClient = null

  useEffect(()=>{
    webSocketClient = new WebSocketClient()
  }, [])

  function exitAppHandle() {
    webSocketClient.send({type:WS_COMMANDS.KILL})
    electronAPI.closeApp()
  }

  function pingHandle() {
    webSocketClient.send({type:WS_COMMANDS.PING})
  }

  function setSave() {
    webSocketClient.send({type:WS_COMMANDS.SET_SAVE, value:{yo:"TEMP SAVE THING"}})
  }

  function getSave() {
    webSocketClient.send({type:WS_COMMANDS.GET_SAVE})
  }



  return (
    <>
  App cool
  <button onClick={exitAppHandle}>Rage quit</button>
  <button onClick={pingHandle}>Send Test to backend 👅👅</button>
  <button onClick={setSave}>Set file (default)</button>
  <button onClick={getSave}>Read file (in console)</button>
    </>
  )
}

export default App