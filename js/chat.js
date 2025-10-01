
const params = new URLSearchParams(window.location.search);
const user_id = params.get("user_id")
const username = params.get("username")
const messageDiv = document.getElementById("messageDiv");
const messageBox = document.getElementById("messageBox");

let socket = null

function scrollToBottom() {
    messageDiv.scrollTo({
        top: messageDiv.scrollHeight,
        behavior: 'smooth'
    });
}

if(user_id && username){

    const leftside_profileName = document.getElementById("leftside_profileName")
    leftside_profileName.innerHTML=`
   <div><img class="rounded-full w-12" src="https://i.pravatar.cc/150?u=${user_id}" alt=""></div>
        <div>
            <h6 class="font-semibold text-lg">${username}</h6>
            <small>Online</small>
        </div>   
  `

  const token = localStorage.getItem("access_token")
  
  
  if(socket) socket.close()

  socket = new WebSocket(`wss://online-chat-backend-o6op.onrender.com/ws/chat/${user_id}/?token=${token}`)
  
  socket.onopen=()=>{
      console.log("Websocket conected...")
  }
  socket.onmessage=(event)=>{
      const data= JSON.parse(event.data)
      console.log("message from server : ",data)
      const myUsername = localStorage.getItem("myUsername")
    
      if(data.sender===myUsername) return

      
      const serverDiv = document.createElement("div")
      serverDiv.className="flex justify-start pb-4"
      serverDiv.innerHTML = `<div class="bg-gray-700 text-white px-4 py-2 rounded-2xl max-w-xs break-words">${data.message}</div>`;
  
      messageDiv.appendChild(serverDiv);
      scrollToBottom() // smoth scroll
      
  }

  socket.onclose = () => {
    console.log("❌ WebSocket Disconnected");
  };

}


const getChatInputValue = () => {

  const messageDiv = document.getElementById("messageDiv");
  const messageBox = document.getElementById("messageBox");
  const msg = messageBox.value.trim();
  if (!msg) return;

  const userDiv = document.createElement("div");
  userDiv.className = "flex justify-end pb-4";
  userDiv.innerHTML = `<div class="bg-purple-600 text-white px-4 py-2 rounded-2xl max-w-xs break-words">${msg}</div>`;
  messageDiv.appendChild(userDiv);
  scrollToBottom() // smoth scroll


//   sent message 
  if(socket && socket.readyState===WebSocket.OPEN){
    const myUsername = localStorage.getItem("myUsername")
    socket.send(JSON.stringify({
        message:msg,
        sender:myUsername,
    }))
  }

  messageBox.value = "";
};

messageBox.addEventListener('focus', () => {
    setTimeout(scrollToBottom, 300); // wait for keyboard animation
});