async function placeOrder() {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  let statusBox = document.getElementById("orderStatus");

  if (cart.length === 0) {
    statusBox.innerHTML = "⚠ Cart is empty!";
    return;
  }

  const email = localStorage.getItem("userEmail");

  if (!email) {
    statusBox.innerHTML = "⚠ Please login first!";
    return;
  }

  // ✅ calculate totalPrice
let totalPrice = cart.reduce((sum, item) => {
  const price = Number(item.price) || 0;
  const quantity = Number(item.quantity) || 1; // ✅ default = 1

  return sum + (price * quantity);
}, 0);

  console.log("Sending:", { email, cart, totalPrice }); // 🔥 debug

  try {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: email,
        items: cart,
        totalPrice: totalPrice
      })
    });

    const data = await res.json();

    if (res.ok) {
      statusBox.innerHTML = "✅ Order placed!";
      localStorage.removeItem("cart");
    } else {
      statusBox.innerHTML = "❌ " + data.message;
    }

  } catch (err) {
    console.log(err);
    statusBox.innerHTML = "❌ Server error!";
  }
}