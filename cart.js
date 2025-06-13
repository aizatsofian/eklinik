const cartBody = document.getElementById("cart-body");
const totalDisplay = document.getElementById("total");

function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartBody.innerHTML = "";

  let grandTotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    grandTotal += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <img src="${item.img}" width="40"><br>
        ${item.name}
      </td>
      <td>RM${item.price}</td>
      <td>
        <button onclick="updateQty(${item.id}, -1)">-</button>
        <input type="text" value="${item.qty}" readonly>
        <button onclick="updateQty(${item.id}, 1)">+</button>
      </td>
      <td>RM${itemTotal}</td>
      <td><button class="delete-btn" onclick="removeItem(${item.id})">Delete</button></td>
    `;
    cartBody.appendChild(row);
  });

  totalDisplay.textContent = `Total : RM ${grandTotal}`;
}

function updateQty(id, change) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty += change;
  if (item.qty < 1) item.qty = 1;
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function removeItem(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart = cart.filter(i => i.id !== id);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

window.onload = loadCart;
