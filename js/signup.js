document.addEventListener("DOMContentLoaded", () => {
  console.log("🔥 NEW FILE LOADED V999");

  const form = document.getElementById("signinForm");
  const message = document.getElementById("message");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("🚀 Sending POST request...");

    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    message.innerText = "";
    message.style.color = "";

    if (!fullName || !email || !password || !confirmPassword) {
      message.style.color = "red";
      message.innerText = "Please fill all fields";
      return;
    }

    if (password !== confirmPassword) {
      message.style.color = "red";
      message.innerText = "Passwords do not match";
      return;
    }

    try {
      const response = await fetch("/api/signup", {   // ✅ FIXED
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ fullName, email, password }),
      });

      let data;

      try {
        data = await response.json();
      } catch {
        message.style.color = "red";
        message.innerText = "Server error";
        return;
      }

      console.log("Server response:", data);

      if (data.success) {
        message.style.color = "green";
        message.innerText = data.message;

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      } else {
        message.style.color = "red";
        message.innerText = data.message;
      }

    } catch (err) {
      console.error(err);
      message.style.color = "red";
      message.innerText = "Server not responding";
    }
  });
});