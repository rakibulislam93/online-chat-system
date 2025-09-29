
const UserLogin=(event)=>{
    event.preventDefault()
    username = document.getElementById("username").value
    password = document.getElementById("password").value
    console.log(username)
    console.log(password)
    fetch("https://online-chat-backend-o6op.onrender.com/accounts/login/",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body : JSON.stringify({username:username,password:password})
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        if(data.message){
            alert("Login successful")
            localStorage.setItem("access_token",data.access)
            localStorage.setItem("myUsername",data.username)
            localStorage.setItem("myUserId",data.user_id)
            window.location.href = "/index.html"
        }
        else if(data.error){
            alert(data.error)
        }
        else{alert("INTERNAL_ERROR")}
    })
    .catch(err=>{
        alert("Nework error login faild : ",err)

    })
}


const UserLogOut=(event)=>{
    event.preventDefault()
    localStorage.removeItem('access_token')
    window.location.href = "/pages/login.html"
}