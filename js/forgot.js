async function sendOtp() {
  const email = document.getElementById("email").value;

  const res = await fetch("/api/send-otp", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.message;
}

async function resetPassword() {
  const email = document.getElementById("email").value;
  const otp = document.getElementById("otp").value;
  const newPassword = document.getElementById("newPassword").value;

  const res = await fetch("/api/reset-password", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, otp, newPassword })
  });

  const data = await res.json();
  document.getElementById("msg").innerText = data.message;
}