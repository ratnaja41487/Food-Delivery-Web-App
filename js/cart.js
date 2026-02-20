/**
 * DISPLAY CART FUNCTION
 * This runs as soon as the page loads. It groups items, 
 * calculates the total, and renders the images.
 */
function displayCart() {
    // 1. Get the data from LocalStorage
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let cartList = document.getElementById("cartList");
    let grandTotal = 0;

    // 2. Handle the empty cart scenario
    if (cart.length === 0) {
        cartList.innerHTML = `
            <div style="text-align:center; padding:50px; color:#999;">
                <h3>Your cart is empty</h3>
                <p>Go back to the menu to add some treats!</p>
            </div>`;
        document.getElementById("grandTotal").innerText = "0";
        return;
    }

    // 3. GROUPING LOGIC
    // This combines multiple "Burgers" into one line with a quantity number
    let grouped = {};
    cart.forEach(item => {
        if (grouped[item.name]) {
            grouped[item.name].qty += 1;
        } else {
            grouped[item.name] = { ...item, qty: 1 };
        }
    });

    cartList.innerHTML = ""; // Clear current list before rendering

    // 4. RENDER THE ITEMS
    Object.values(grouped).forEach(item => {
        let itemTotal = item.price * item.qty;
        grandTotal += itemTotal;

        // IMAGE CHECK: If 'item.image' is missing, it shows a grey placeholder
        let imgSource = item.image ? item.image : "https://via.placeholder.com/80?text=No+Image";

        cartList.innerHTML += `
            <div class="cart-card">
                <img src="${imgSource}" class="prod-img" onerror="this.src='https://via.placeholder.com/80?text=Error'">
                <div class="details">
                    <span class="name">${item.name}</span>
                    <span class="price">₹${item.price}</span>
                </div>
                <div class="controls">
                    <button class="btn" onclick="changeQty('${item.name}', -1)">−</button>
                    <span class="qty">${item.qty}</span>
                    <button class="btn" onclick="changeQty('${item.name}', 1)">+</button>
                </div>
            </div>
        `;
    });

    // 5. Update the Total Amount in the sticky footer
    document.getElementById("grandTotal").innerText = grandTotal;
}

/**
 * CHANGE QUANTITY FUNCTION
 * Adds or removes a single item instance when + or - is clicked.
 */
function changeQty(itemName, delta) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (delta === 1) {
        // Add one more: find the item details and push it again
        let itemToCopy = cart.find(i => i.name === itemName);
        if (itemToCopy) cart.push({ ...itemToCopy });
    } else {
        // Remove one: find the last index of this item and remove it
        let index = cart.map(i => i.name).lastIndexOf(itemName);
        if (index > -1) cart.splice(index, 1);
    }

    // Save the updated array back to LocalStorage
    localStorage.setItem("cart", JSON.stringify(cart));
    
    // Refresh the display immediately
    displayCart();
}

/**
 * PLACE ORDER FUNCTION
 */
function placeOrder() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart.length === 0) return alert("Your cart is empty!");

    alert("Order Placed Successfully! 🎉");
    localStorage.removeItem("cart"); // Clear the cart after order
    window.location.href = "home.html"; // Go back to home
}

// Initialize the cart display on page load
window.onload = displayCart;