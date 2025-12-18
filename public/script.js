const socket = io()
const messageContainer = document.getElementById('message-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

const username = prompt('What is your name?') 

function getTime() {
  const now = new Date();
  return now.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

appendMessage('⭐ You joined the chat')
socket.emit('new-user', username)

// when someone sends a message
socket.on('chat-message', data => {
  appendMessage(`💬 ${data.username}: ${data.message}`)
})

// when a user connects
socket.on('user-connected', username => {
  appendMessage(`🌐 ${username} connected`)
})

// when a user disconnects
socket.on('user-disconnected', username => {
  appendMessage(`🚫 ${username} disconnected`)
})

// sending message
messageForm.addEventListener('submit', e => {
  e.preventDefault()
  const message = messageInput.value
  appendMessage(`You: ${message}`)
  socket.emit('send-chat-message', message)
  messageInput.value = ''
})

function appendMessage(message) {
  const messageElement = document.createElement('div')
  const time = getTime();
  messageElement.innerText = `[${time}] ${message}`;
  messageContainer.append(messageElement)
}