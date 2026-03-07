document.getElementById("loginForm").addEventListener("submit", function(e) {

e.preventDefault();

let email = document.getElementById("email").value.trim().toLowerCase();
let password = document.getElementById("password").value.trim();
let errorMsg = document.getElementById("error");

errorMsg.innerText = "";

// Check empty fields
if(email === "" || password === ""){
errorMsg.innerText = "Please enter email and password";
return;
}

// Admin Login
if(email === "admin@gmail.com" && password === "admin123"){
alert("Admin Login Successful");
window.location.href = "admin.html";
return;
}

// Get registered users
let users = JSON.parse(localStorage.getItem("users")) || [];

// Check if user exists
let validUser = users.find(user => user.email === email && user.password === password);

if(validUser){
alert("User Login Successful");
window.location.href = "home.html";
}
else{
errorMsg.innerText = "Invalid email or password";
}

});
