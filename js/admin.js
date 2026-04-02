

function loadDashboard(){

let orders = JSON.parse(localStorage.getItem("orders")) || [];
let users = JSON.parse(localStorage.getItem("users")) || [];

let table = document.getElementById("ordersTable");

table.innerHTML = `
<tr>
<th>Order ID</th>
<th>Customer</th>
<th>Status</th>
</tr>
`;

let revenue = 0;
let pending = 0;

orders.forEach(order => {

let orderTotal = 0;

order.items.forEach(item=>{
orderTotal += item.price;
});

revenue += orderTotal;

if(order.status === "Pending"){
pending++;
}

table.innerHTML += `
<tr>
<td>${order.id}</td>
<td>${order.customer}</td>
<td>${order.status}</td>
</tr>
`;

});

document.getElementById("totalOrders").innerText = orders.length;
document.getElementById("totalRevenue").innerText = "₹"+revenue;
document.getElementById("totalUsers").innerText = users.length;
document.getElementById("pendingOrders").innerText = pending;

}

window.onload = loadDashboard;


