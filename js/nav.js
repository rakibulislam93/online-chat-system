
// Dropdown menu handle 
const menuBtn = document.getElementById('menuBtn')
const dropdownMenu = document.getElementById('dropdownMenu')
menuBtn.addEventListener("click",()=>{
  dropdownMenu.classList.toggle('hidden')
})
// dropdown sara baire click korleo hidden hobe..

window.addEventListener("click", (e)=>{
  if(!menuBtn.contains(e.target) && !dropdownMenu.contains(e.target)){

    dropdownMenu.classList.add('hidden')
  }
})


const access_token = localStorage.getItem("access_token")
const myUsername = localStorage.getItem("myUsername")
const myUserId = localStorage.getItem('myUserId')

if(access_token && myUserId){
  dropdownMenu.innerHTML=`
  <a onclick="UserLogOut(event)" class="block cursor-pointer px-4 py-2 hover:bg-gray-200">Logout</a>
  `
}
else{
  dropdownMenu.innerHTML=`
  <a href="/pages/login.html" class="block px-4 py-2 hover:bg-gray-200">Login</a>
  <a href="#register" class="block px-4 py-2 hover:bg-gray-200">Register</a>
  `
}
