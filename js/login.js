document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.textContent = "";

  const savedUser = JSON.parse(localStorage.getItem("user"));

  // ❌ No account exists
  if (!savedUser) {
    error.textContent = "No account found. Please sign up first.";
    error.style.color = "red";
    return;
  }

  // ❌ Email or password mismatch
  if (email !== savedUser.email || password !== savedUser.password) {
    error.textContent = "Invalid email or password";
    error.style.color = "red";
    return;
  }

  // ✅ Login success
  window.location.href = "home.html";
});
