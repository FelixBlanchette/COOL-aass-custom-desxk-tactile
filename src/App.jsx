import { useEffect, useState } from 'react'
import './App.css'
import WebSocketClient from './assets/scripts/WebSocketClient'
import { WS_COMMANDS } from './assets/scripts/webSocketCommands'
import {CalendarContext} from './components/contexts/CalendarContext.jsx'
import {WSClientContext} from './components/contexts/WSClientContext.jsx'

function App() {
  const [webSocketClient, setWebSocketClient] = useState(null),
        [saveData, setSaveData] = useState(null)

  useEffect(()=>{
    console.log("INIT")
    setWebSocketClient(new WebSocketClient())
  }, [])

  function exitAppHandle() {
    webSocketClient.send({type:WS_COMMANDS.KILL})
    electronAPI.closeApp()
  }

  function pingHandle() {
    webSocketClient.send({type:WS_COMMANDS.PING}, (res)=>console.log("PING RES", res))
  }

  function setSave() {
    webSocketClient.send({type:WS_COMMANDS.SET_SAVE, value:{yo:"TEMP SAVE THING"}})
  }

  function getSave() {
    webSocketClient.send({type:WS_COMMANDS.GET_SAVE}, (res)=>console.log("SAVE RES", res))
  }



  return (
    <CalendarContext.Provider value={saveData}>
    <WSClientContext.Provider value={webSocketClient}>

  App cool
  <button onClick={exitAppHandle}>Rage quit</button>
  <button onClick={pingHandle}>Send Test to backend 👅👅</button>
  <button onClick={setSave}>Set file (default)</button>
  <button onClick={getSave}>Read file (in console)</button>
    </WSClientContext.Provider>
    </CalendarContext.Provider>
  )
}

export default App