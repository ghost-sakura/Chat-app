const express = require("express")
const http = require("http")
const socketio = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const users ={}

app.use(express.static("public"))

io.on('connection', socket => {
  socket.on('new-user', username => {
    users[socket.id] = username 
    socket.broadcast.emit('user-connected', username)
  })
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, username:
    users[socket.id] })  
  })  
  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000")
})