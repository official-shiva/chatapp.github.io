const socket = io();
let name;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector(".message_area")

do {
    name = prompt("Please enter your name: ")
} while (!name);

// By Shiva
let sendbtn = document.querySelector("#sendmsg")
sendbtn.addEventListener("click", (e) => {
    // console.log(textarea.value)
    if (textarea.value !== ' ')
        sendMessage(textarea.value);
})

//main 
textarea.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') {
        if (textarea.value !== ' ') {
            sendMessage(e.target.value)
        }
    }
})

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    }

    // Append the message
    appendMessage(msg, 'outgoing');
    textarea.value = ' '
    scrollToBottom()

    // send to the server 
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div')
    let className = type
    mainDiv.classList.add(className, 'message')

    let markup = `
                <h4>${msg.user}</h4>
                <p>${msg.message}</p>
            `

    mainDiv.innerHTML = markup
    messageArea.appendChild(mainDiv);
}

// Recieve messages
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
    scrollToBottom()
})

function scrollToBottom() {
    messageArea.scrollTop = messageArea.scrollHeight
}