document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    console.log("Login response:", data);

    if (data.success) {

      // ✅ Admin check
      if (data.role === "admin") {
        alert("Admin Login Successful");
        window.location.href = "/admin1";
      } 
      else {
        alert("User Login Successful");
        localStorage.setItem("userEmail", email.toLowerCase());
        window.location.href = "/home";
      }

    } else {
      error.innerText = data.message;
    }

  } catch (err) {
    console.error(err);
    error.innerText = "Server error";
  }
});