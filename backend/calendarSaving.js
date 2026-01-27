import { readFile, writeFile } from "fs"
import {dirname, join} from "path"
import { fileURLToPath } from "url"

const SAVE_PATH = join(dirname(fileURLToPath(import.meta.url)), "calendarSaves"), FILE_NAME = "calendarSave.json", FULL_PATH = join(SAVE_PATH, FILE_NAME)

function setSavedCalendar(obj, callback=()=>{}) {
    obj ||= {}
    writeFile(FULL_PATH, JSON.stringify(obj), callback)
}

function getSavedCalendar(callback) {
    readFile(FULL_PATH, "utf8", (err, data)=>callback(err, JSON.parse(data), FULL_PATH))
}

export {setSavedCalendar, getSavedCalendar}