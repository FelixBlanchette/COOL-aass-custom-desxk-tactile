import { contextBridge, ipcRenderer } from "electron";
import { COMMANDS } from "./commands.js";

contextBridge.exposeInMainWorld("electronAPI", {
    closeApp: () => ipcRenderer.send(COMMANDS.EXIT_APP)
});