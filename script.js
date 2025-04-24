const menuItems = [
    { name: "Paneer Butter Masala", price: 180 },
    { name: "Chicken Biryani", price: 220 },
    { name: "Masala Dosa", price: 90 },
    { name: "Samosa", price: 20 },
    { name: "Chai", price: 15 },
  ];
  
  let order = [];
  
  // Render menu items on the page
  function renderMenu() {
    const menuDiv = document.getElementById('food-menu');
    menuDiv.innerHTML = ''; // Clear previous
    menuItems.forEach((item, index) => {
      const div = document.createElement('div');
      div.className = 'food-item';
      div.innerHTML = `
        ${item.name} - ₹${item.price.toFixed(2)}
        <button onclick="addToOrder(${index})">Add</button>
      `;
      menuDiv.appendChild(div);
    });
  }
  
  // Render current order
  function renderOrder() {
    const orderList = document.getElementById('order-list');
    const totalPriceText = document.getElementById('total-price');
    orderList.innerHTML = '';
  
    let total = 0;
    order.forEach((item, index) => {
      total += item.price;
      const li = document.createElement('li');
      li.innerHTML = `
        ${item.name} - ₹${item.price.toFixed(2)}
        <button onclick="removeFromOrder(${index})">Remove</button>
      `;
      orderList.appendChild(li);
    });
  
    totalPriceText.textContent = `Total: ₹${total.toFixed(2)}`;
  }
  
  // Add item to order
  function addToOrder(index) {
    order.push(menuItems[index]);
    renderOrder();
  }
  
  // Remove item from order
  function removeFromOrder(index) {
    order.splice(index, 1);
    renderOrder();
  }
  
  // Clear the entire order
  function clearOrder() {
    order = [];
    document.getElementById('summary-details').textContent = 'No order yet.';
    renderOrder();
  }
  
  // Place the order (and show summary)
  function placeOrder() {
    const name = document.getElementById('customer-name').value.trim();
    const phone = document.getElementById('customer-phone').value.trim();
  
    if (!name || !phone) {
      alert("Please enter your name and phone number.");
      return;
    }
  
    if (order.length === 0) {
      alert("No items in the order.");
      return;
    }
  
    let summary = `Customer: ${name}\nPhone: ${phone}\n\nItems:\n`;
    let total = 0;
  
    order.forEach(item => {
      summary += `• ${item.name} - ₹${item.price.toFixed(2)}\n`;
      total += item.price;
    });
  
    summary += `\nTotal Amount: ₹${total.toFixed(2)}`;
  
    // Display on page
    document.getElementById('summary-details').innerHTML = summary.replace(/\n/g, "<br>");
    alert("Order placed! Scroll down to see your summary.");
  }
  
  // Initialize
  renderMenu();
  renderOrder();