const express = require("express")
const path = require("path")
const { createServer } = require("http")
const { Server } = require("socket.io");


const app = express()
const server = createServer(app)
const io = new Server(server);
app.use(express.static(path.join(__dirname)))

io.on("connection", function(socket){
    socket.on("newuser", function(username){
      socket.broadcast.emit("update", username + "joined the conversation")
    })
    socket.on("exituser", function(username){
      socket.broadcast.emit("update", username + "joined the conversation")
    })
    socket.on("chat", function(message){
      socket.broadcast.emit("chat", message)
    })

})


app.use(express.static(path.join(__dirname)))

server.listen(5000)

