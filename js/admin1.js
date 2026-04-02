async function loadDashboard(){

  try{

    const res = await fetch("/api/orders");
    const orders = await res.json();

    // ✅ Total Orders
    document.getElementById("totalOrders").innerText = orders.length;

    // ✅ Total Revenue
    let revenue = orders.reduce((sum, o) => {
      return sum + (o.totalPrice || 0);
    }, 0);

    document.getElementById("totalRevenue").innerText = "₹" + revenue;

    // ✅ Pending Orders
    let pending = orders.filter(o => o.status !== "Completed").length;

    document.getElementById("pendingOrders").innerText = pending;

    // ✅ Total Users (unique emails)
    let users = [...new Set(orders.map(o => o.email))];
    document.getElementById("totalUsers").innerText = users.length;

    // ✅ Recent Orders Table
    let table = document.getElementById("ordersTable");

    orders.slice(-5).reverse().forEach(order => {
      table.innerHTML += `
        <tr>
          <td>${order._id}</td>
          <td>${order.email}</td>
          <td>${order.status}</td>
        </tr>
      `;
    });

  }
  catch(err){
    console.log(err);
  }

}

window.onload = loadDashboard;