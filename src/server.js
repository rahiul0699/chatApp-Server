const express=require('express')
const http=require("http")
const app=express();
const socketio=require('socket.io')

app.get("/",(req,res)=>{
    res.send("Chat server is running")
})
const server=http.createServer(app)
const io=socketio(server)


module.exports={
server,
io
}