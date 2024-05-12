const express = require("express")
const path = require("path")
const { createServer } = require("http")
const { Server } = require("socket.io");
const CryptoJS = require('crypto-js/core')
CryptoJS.AES = require("crypto-js/aes");
const opn = require('opn');

const key = "SECRET-KEY"
const iv = "SECRET-IV"

const app = express()
const server = createServer(app)
const io = new Server(server);
opn('http://localhost:5000');

app.use(express.static(path.join(__dirname)))
io.on("connection", function(socket){
    socket.on("newuser",  function(username){
      socket.broadcast.emit("update", username + " joined the conversation")
    })
    socket.on("exituser", function(username){
      socket.broadcast.emit("update", username + " left the conversation")
    })
    socket.on("chat", function(message){
      message.text = CryptoJS.AES.encrypt(message.text, key, {iv: iv}).toString();
      socket.broadcast.emit("chat", message)
    })

})

server.listen(5000);

