document.getElementById("signinForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const message = document.getElementById("message");

  message.textContent = "";

  if (!fullName || !email || !password || !confirmPassword) {
    message.textContent = "Please fill all fields";
    message.style.color = "red";
    return;
  }

  if (password !== confirmPassword) {
    message.textContent = "Passwords do not match";
    message.style.color = "red";
    return;
  }

  const user = { fullName, email, password };

  // ✅ KEY NAME IS IMPORTANT
  localStorage.setItem("user", JSON.stringify(user));

  message.textContent = "Account created successfully!";
  message.style.color = "green";

  setTimeout(() => {
    window.location.href = "home.html";
  }, 1200);
});
