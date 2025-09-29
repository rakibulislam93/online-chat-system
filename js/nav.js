
const navLinks = document.getElementById("nav_links");

  function renderNavbar() {
    const token = localStorage.getItem("access_token");
    navLinks.innerHTML = "";

    if (token) {
      // User logged in
      navLinks.innerHTML = `
        <li><a href="profile.html">Profile</a></li>
        <li><button onclick="UserLogOut(event)">Logout</button></li>
      `;
    } else {
      // User not logged in
      navLinks.innerHTML = `
        <li><a href="./pages/login.html">Login</a></li>
        <li><a href="register.html">Register</a></li>
      `;
    }
  }

  renderNavbar();