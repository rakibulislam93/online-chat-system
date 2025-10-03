
const UserRegister=(event)=>{
    event.preventDefault()
    const form = document.getElementById("registerForm")
    const formData = new FormData(form)
    const data = Object.fromEntries(formData.entries())

    const spinner = document.getElementById("spinner")
    const registerBtn = event.target.querySelector('button[type="submit"]')

    spinner.classList.remove("hidden")
    registerBtn.disable = true
    registerBtn.classList.add("opacity-50","cursor-not-allowed")
    
    
    fetch(`https://online-chat-backend-gdpd.onrender.com/accounts/register/`,{
        method:"POST",
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(data)

    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)

        spinner.classList.add("hidden")
        registerBtn.disable = false
        registerBtn.classList.remove("opacity-50","cursor-not-allowed")

        if(data.error){
            alert(`error : ${data.error}`)
        }
        else if(data.non_field_errors){
            alert("This password is too common..please create strong password")
        }
        else if(data.username){
            alert("Username already exists..")
        }
        else if(data.message){
            alert("Check your mail and activate your account")
            window.location.href = "/pages/login.html"
        }
        else{
            alert("something went wrong...")
        }
    })
    .catch(err=>{
        alert(`error : ${err}`)
    })
}
const form = document.getElementById("registerForm");
if (form) {
    form.addEventListener("submit", UserRegister);
}



const UserLogin=(event)=>{
    event.preventDefault()
    username = document.getElementById("username").value
    password = document.getElementById("password").value
    
    const spinner = document.getElementById("spinner")
    const loginBtn = event.target.querySelector('button[type="submit"]')

    spinner.classList.remove("hidden")
    loginBtn.disable = true
    loginBtn.classList.add("opacity-50","cursor-not-allowed")


    fetch("https://online-chat-backend-gdpd.onrender.com/accounts/login/",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body : JSON.stringify({username:username,password:password})
    })
    .then(res=>res.json())
    .then(data=>{
        console.log(data)
        // hide spinner and enable button
        spinner.classList.add("hidden")
        loginBtn.disable = false
        loginBtn.classList.remove("opacity-50","cursor-not-allowed")
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