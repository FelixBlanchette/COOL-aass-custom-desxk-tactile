import { WebSocketServer } from "ws"
import { WS_COMMANDS } from "../src/assets/scripts/webSocketCommands.js"
import { getSavedCalendar, setSavedCalendar } from "./calendarSaving.js"
import express from "express"

const PORT_WS = 3000, PORT_EXPRESS = 3001


const wss = new WebSocketServer({port:PORT_WS}, ()=>{
    console.clear()
    console.log("\nWEBSOCKET SERVER RUNNING, (ws://0.0.0.0:"+PORT_WS+")")
}), app = express()

app.use(express.json())


app.listen(PORT_EXPRESS, "172.16.10.6", ()=>{
    console.log("SERVER EXPRESS", "172.16.10.6")
})

app.get("/singe", (req, res)=>{
    console.log("YO", res.socket.remoteAddress)
    res.send("BURGER TOWN", res.socket.remoteAddress)
})

app.get("/", (req, res)=>{
    console.log("YO")
    res.send("index.htnl or somthing")
})



// INIT WS SERVER
wss.on("connection", ws=>{
    console.log("FRONTEND CONNECTED")

    ws.on("close", ()=>console.log("FRONTEND DISCONNECT"))

    ws.on("message", message=>{
        const msg = JSON.parse(message.toString())
        handleCommand(msg.type, ws, msg)
    })
})

function send(ws, obj) {
    ws.send(JSON.stringify(obj))
}

function sendResponse(ws, obj, response) {
        if (obj?.RESPONSE_ID) response.RESPONSE_ID = obj?.RESPONSE_ID
        response.type = WS_COMMANDS.RESPONSE
        send(ws, response)
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
        sendResponse(ws, obj, {value:"Hey man! working"})
    }
    else if (type === WS_COMMANDS.GET_SAVE) {
        getSavedCalendar((err, data, path)=>{
            console.log("READING FILE, value:", data, "PATH",path)
            if (err) sendResponse(ws, obj, {value:err})
            else sendResponse(ws, obj, {value:data})
            
        })
    }
    else if (type === WS_COMMANDS.SET_SAVE) {
        console.log("SETTING FILE, value:", obj.value)
        setSavedCalendar(obj.value)
        sendResponse(ws, obj, {value:obj.value})
    }
}
