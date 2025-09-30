
const loadAllUsers = () => {
  fetch("https://online-chat-backend-o6op.onrender.com/accounts/users/")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const UserListDiv = document.getElementById("userList");
      data.forEach((user) => {
        const div = document.createElement("div");
        div.innerHTML = `
        <div class="flex items-center gap-5 text-white mb-5">
          <div>
            <img class="rounded-full w-14" src="https://i.pravatar.cc/150?u=${user.id}" alt="">
          </div>
          <div>
            <small class="font-semibold text-md">${user.username}</small>
            <p class="text-gray-400">Lorem ipsum dolor sit amet.</p>
          </div>
        </div>

        `;
        UserListDiv.appendChild(div)
        div.classList.add("cursor-pointer")
        div.addEventListener("click",()=>{
          window.location.href = `/pages/message.html?user_id=${user.id}&username=${user.username}`
          
        })
      });
    });
};

document.addEventListener("DOMContentLoaded", () => {
  loadAllUsers();
});
