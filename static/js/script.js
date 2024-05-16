function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;
    appendUserMessage(userInput);
    getResponse(userInput);
    document.getElementById("userInput").value = "";
}

function appendUserMessage(message) {
    var chatBox = document.getElementById("chatBox");
    var userBubble = document.createElement("div");
    userBubble.classList.add("user-bubble");
    userBubble.innerHTML = '<i class="far fa-user user-icon"></i>' + message;
    chatBox.appendChild(userBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function appendBotMessage(message) {
    var chatBox = document.getElementById("chatBox");
    var botBubble = document.createElement("div");
    botBubble.classList.add("chat-bubble");
    botBubble.innerHTML = '<i class="fas fa-rocket chatbot-icon"></i>' + message;
    chatBox.appendChild(botBubble);
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function getResponse(userInput) {
    const question = document.getElementById('userInput').value;
    const response = await fetch('/ask', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userInput: question })
    });
    const data = await response.json();
    let capitalizedFirstLetter = data.answer.charAt(0).toUpperCase() + data.answer.slice(1);
    if (capitalizedFirstLetter.charAt(capitalizedFirstLetter.length - 1) !== '.') {
        capitalizedFirstLetter += '.';
    }
    document.getElementById('answer').innerText = capitalizedFirstLetter;
    appendBotMessage(capitalizedFirstLetter);
}


function toggleDarkMode() {
    var body = document.body;
    var inputBox = document.querySelector('.input-box input[type="text"]');
    body.classList.toggle("dark-mode");
    inputBox.classList.toggle("dark-mode");
}

function dragStart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
}

function dragOver(event) {
    event.preventDefault();
}

function sendMessage() {
    var userInput = document.getElementById("userInput").value;
    if (userInput.trim() === "") return;
    if (userInput.trim() === "/clean") {
        clearChat(); // Call function to clear chat
        return;
    }
    appendUserMessage(userInput);
    getResponse(userInput);
    document.getElementById("userInput").value = "";
}

function clearChat() {
    var chatBox = document.getElementById("chatBox");
    // Remove all chat bubbles
    chatBox.innerHTML = '';
    // Append the initial welcome message back to the chat box
    appendBotMessage("Welcome to SLA-GPT! Feel free to ask any questions regarding SLA.");
}

function drop(event) {
    event.preventDefault();
    var data = event.dataTransfer.getData("text/plain");
    var draggableElement = document.getElementById(data);
    var dropzone = event.target.closest('.container');
    dropzone.appendChild(draggableElement);
}

// Event listener for Enter key press
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission behavior
        sendMessage();
    }
});