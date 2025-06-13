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
