// ====== Global variables ======
let socket = null;
let currentReceiver = null;

// ====== Load users dynamically ======
const loadAllUsers = () => {
  fetch("http://127.0.0.1:8000/accounts/users/")
    .then(res => res.json())
    .then(data => {
      const parentDiv = document.getElementById("userLists");   // sidebar
      const topUserDiv = document.getElementById("topUserList"); // top bar

      parentDiv.innerHTML = ""; 
      topUserDiv.innerHTML = ""; 

      data.forEach(element => {
        // Sidebar user (vertical)
        const sideDiv = document.createElement("div");
        sideDiv.className = "flex flex-col items-center md:flex-row md:gap-3 cursor-pointer";
        sideDiv.innerHTML = `
          <img src="https://i.pravatar.cc/150?u=${element.id}" class="w-12 h-12 rounded-full">
          <small>${element.username}</small>
        `;
        sideDiv.addEventListener("click", () => openChat(element));
        parentDiv.appendChild(sideDiv);

        // Top user (horizontal)
        const topDiv = document.createElement("div");
        topDiv.className = "flex flex-col items-center cursor-pointer";
        topDiv.innerHTML = `
          <img src="https://i.pravatar.cc/150?u=${element.id}" class="w-12 h-12 rounded-full">
          <small>${element.username}</small>
        `;
        topDiv.addEventListener("click", () => openChat(element));
        topUserDiv.appendChild(topDiv);
      });
    });
};

// ====== Open Chat Window & Connect WebSocket ======
function openChat(user) {
  currentReceiver = user;  // store current chat user
  const token = localStorage.getItem("access_token")
  const myUsername = localStorage.getItem("myUsername")
  const myUserId = localStorage.getItem('myUserId')

  fetch(`http://127.0.0.1:8000/chat/${myUserId}/${user.id}/messages/`)
  .then(res=>res.json())
  .then(data=>{
    console.log(data)
    data.forEach(element => {
      const type = (element.sender_name === myUsername)?"sent" : "receiver"
      appendMessage(element.content,type)
    });
  })

  // Close previous socket if open
  if (socket) socket.close();

  // Connect WebSocket
  socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/${user.id}/?token=${token}`);

  socket.onopen = () => {
    console.log("Connected to WebSocket for", user.username);
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log(data.sender)
    if(data.sender !== myUsername){

      appendMessage(data.message, "received"); // server থেকে আসা message
    }
  };

  socket.onclose = () => {
    console.log("WebSocket closed");
  };

  // Render chat window
  const chatWindow = document.getElementById("chatWindow");
  chatWindow.innerHTML = `
    <div class="flex justify-between items-center p-3 border-b bg-gray-100">
      <span class="font-bold"> Chat with ${user.username}</span>
      <button onclick="closeChat()" class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
    </div>

    <div id="chatMessages" class="flex-1 p-4 overflow-y-auto"></div>

    <div class="p-3 flex gap-2 border-t">
      <input id="chatInput" type="text" class="flex-1 border rounded px-3 py-2" placeholder="Type a message...">
      <button onclick="sendMessage()" class="bg-blue-600 text-white px-4 rounded hover:bg-blue-700">Send</button>
    </div>
  `;
  chatWindow.classList.remove("hidden");
}

// ====== Send message ======
function sendMessage() {
  const input = document.getElementById("chatInput");
  const message = input.value.trim();

  if (message && socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify({
      receiver_id: currentReceiver.id,
      message: message
    }));

    appendMessage(message, "sent"); // UI তে show করি
    input.value = "";
  }
}

// ====== Append message to chat ======
function appendMessage(message, type) {
  const messagesDiv = document.getElementById("chatMessages");
  const msgDiv = document.createElement("div");

  msgDiv.className = type === "sent"
    ? "text-right mb-2"
    : "text-left mb-2";

  msgDiv.innerHTML = `
    <span class="inline-block px-3 py-2 rounded-lg ${type === "sent" ? "bg-blue-500 text-white" : "bg-gray-200"}">
      ${message}
    </span>
  `;
  
  messagesDiv.appendChild(msgDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight; // scroll down
}

// ====== Close chat window ======
function closeChat() {
  if (socket) {
    socket.close();
    socket = null;
  }
  document.getElementById("chatWindow").classList.add("hidden");
}

// ====== Initial call ======
loadAllUsers();
