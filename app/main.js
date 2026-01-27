import { app, BrowserWindow, ipcMain } from "electron"
import path from "path"
import { fileURLToPath } from "url"
import { COMMANDS } from "./commands.js"
import { spawn } from "child_process"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
let serverProcess = null

function createWindow() {
    const appWindow = new BrowserWindow({
        width: 1920,
        height: 800,
        menuBarVisible: false,
        alwaysOnTop: true,
        webPreferences: {
            preload: path.join(__dirname, "init.js"),
            contextIsolation: true,
            nodeIntegration: true,
            devTools: true,
        },
        title:"Bonjour",
        backgroundColor:"#000000",
        darkTheme: true,
    })

    appWindow.loadURL("http://localhost:5173")
    
    return appWindow
}


app.whenReady().then(()=>{
    const appWindow = createWindow()

    serverProcess = spawn("node", [path.join(__dirname, "..", "backend", "server.js")], {stdio: "inherit", windowsHide:true})

    // DEFINE COMMANDS
    ipcMain.on(COMMANDS.EXIT_APP, () => {
        appWindow.close()
    })
})

app.on("window-all-closed", ()=>{
    if (serverProcess) serverProcess.kill()
    app.quit()
})