import express from "express"

const app = express(), PORT = 3000

app.get("/test", (req, res)=>{
    console.log("YO SERVER WORKING")
})

app.listen(PORT, ()=>{
    console.log("SERVER ON!!!!")
})