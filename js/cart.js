/**
 * Renders the cart items and calculates the bill.
 * This version includes a safety filter to remove "undefined" ghost items.
 */
function renderCart() {
    // 1. Get data and immediately FILTER out corrupted "undefined" or 0-quantity items
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Safety Filter: Only keep items that have a Name, a Price, and Quantity > 0
    cart = cart.filter(item => item.name && item.price !== undefined && item.quantity > 0);
    
    // Save the cleaned version back to localStorage so the "ghosts" don't return
    localStorage.setItem("cart", JSON.stringify(cart));

    const container = document.getElementById("cart-container");
    const footer = document.getElementById("footer-bar");
    const btnTotalText = document.getElementById("btn-total");

    if (!container) return;

    // 2. Handle Empty State
    if (cart.length === 0) {
        if (footer) footer.style.display = "none";
        container.innerHTML = `
            <div style="text-align:center; padding:100px 20px;">
                <img src="https://cdn-icons-png.flaticon.com/512/11329/11329073.png" width="100" style="opacity:0.5;">
                <h3 style="margin-top:20px; color:#333;">Your cart is empty</h3>
                <button onclick="location.href='breakfast.html'" 
                        style="background:#1c8d1c; color:white; border:none; padding:12px 25px; border-radius:8px; margin-top:15px; cursor:pointer; font-weight:bold;">
                    Browse Menu
                </button>
            </div>`;
        return;
    }

    // 3. Show footer and setup calculations
    if (footer) footer.style.display = "flex";
    let subtotal = 0;

    // 4. Generate HTML for valid items
    const itemsHtml = cart.map((item, index) => {
        const price = parseFloat(item.price) || 0;
        const qty = parseInt(item.quantity) || 0;
        subtotal += (price * qty);

        return `
        <div style="display:flex; background:white; padding:15px; border-radius:12px; margin-bottom:10px; align-items:center; box-shadow:0 2px 5px rgba(0,0,0,0.03);">
            <img src="${item.image}" style="width:60px; height:60px; border-radius:8px; object-fit:cover;" onerror="this.src='assets/placeholder.jpg'">
            <div style="flex:1; margin-left:15px;">
                <div style="font-weight:600; color:#333;">${item.name}</div>
                <div style="font-weight:700; color:#000;">₹${price}</div>
            </div>
            <div style="display:flex; align-items:center; background:#1c8d1c; color:white; border-radius:6px; min-width:80px; justify-content:space-between;">
                <button onclick="updateQty(${index}, -1)" style="color:white; border:none; background:none; padding:5px 10px; cursor:pointer; font-weight:bold;">-</button>
                <span style="font-weight:bold;">${qty}</span>
                <button onclick="updateQty(${index}, 1)" style="color:white; border:none; background:none; padding:5px 10px; cursor:pointer; font-weight:bold;">+</button>
            </div>
        </div>`;
    }).join('');

    const handlingCharge = 2;
    const grandTotal = subtotal + handlingCharge;

    // 5. Update UI
    container.innerHTML = `
        <div style="margin-bottom:15px; font-weight:bold; color:#555;">Review Items</div>
        ${itemsHtml}
        <div style="background:white; padding:15px; border-radius:12px; margin-top:20px; box-shadow:0 2px 5px rgba(0,0,0,0.03);">
            <h3 style="font-size:16px; margin:0 0 15px 0;">Bill details</h3>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px; color:#666;">
                <span>Item Total</span><span>₹${subtotal}</span>
            </div>
            <div style="display:flex; justify-content:space-between; margin-bottom:8px; font-size:14px; color:#666;">
                <span>Handling Charge</span><span>₹${handlingCharge}</span>
            </div>
            <div style="display:flex; justify-content:space-between; border-top:1px dashed #ddd; padding-top:10px; margin-top:10px; font-weight:bold; font-size:16px;">
                <span>Grand Total</span><span>₹${grandTotal}</span>
            </div>
        </div>`;

    if (btnTotalText) btnTotalText.innerText = `₹${grandTotal}`;
}

/**
 * Updates quantity and re-renders
 */
function updateQty(index, change) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index]) {
        cart[index].quantity = (parseInt(cart[index].quantity) || 0) + change;
        // Remove item if quantity hits 0
        if (cart[index].quantity <= 0) cart.splice(index, 1);
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCart();
    }
}

/**
 * Final Order Placement
 */
function placeOrder() {
    alert("Order Placed Successfully!");
    localStorage.removeItem("cart");
    location.href = "home.html";
}

// Initialize on load
window.onload = renderCart;