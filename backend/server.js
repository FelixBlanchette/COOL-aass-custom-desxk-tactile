import { WebSocketServer } from "ws"
import { WS_COMMANDS } from "../src/assets/scripts/webSocketCommands.js"
import { getSavedCalendar, setSavedCalendar } from "./calendarSaving.js"

const PORT = 3000, wss = new WebSocketServer({port:PORT}, ()=>{
    console.clear()
    console.log("\nWEBSOCKET SERVER RUNNING, (ws://localhost:"+PORT+")")
})

// INIT WS SERVER
wss.on("connection", ws=>{
    console.log("FRONTEND CONNECTED")

    ws.on("close", ()=>console.log("FRONTEND DISCONNECT"))

    ws.on("message", message=>{
        const msg = JSON.parse(message.toString())
        handleCommand(msg.type, ws, msg.value&&JSON.parse(msg.value))
    })
})

function send(ws, obj) {
    ws.send(JSON.stringify(obj))
}

// HANDLE INCOMING COMMANDS FROM FRONTEND
function handleCommand(type, ws, obj) {
    if (type === WS_COMMANDS.KILL) {
        console.log("SERVER KILLED")
        wss.close()
        process.exit()
    }
    else if (type === WS_COMMANDS.PING) {
        console.log("SERVER PING")
        send(ws, {type:WS_COMMANDS.RESPONSE, value:"Hey man! working"})
    }
    else if (type === WS_COMMANDS.GET_SAVE) {
        getSavedCalendar((err, data, path)=>{
            console.log("READING FILE, value:", data, "PATH",path)
            if (err) send(ws, {type:WS_COMMANDS.RESPONSE, value:null})
            else send(ws, {type:WS_COMMANDS.RESPONSE, value:data})
        })
    }
    else if (type === WS_COMMANDS.SET_SAVE) {
        console.log("SETTING FILE, value:", obj)
        setSavedCalendar(obj)
    }
}
