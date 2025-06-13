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

window.onload = () => {
  loadCart();

  const checkoutBtn = document.querySelector('.checkout-btn');
  checkoutBtn.addEventListener('click', handleCheckout);
};

function handleCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Troli kosong!");
    return;
  }

  const name = document.getElementById("cust-name").value.trim();
  const email = document.getElementById("cust-email").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();

  if (!name || !email || !phone) {
    alert("Sila lengkapkan maklumat pelanggan.");
    return;
  }

  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const sheetURL = "https://script.google.com/macros/s/AKfycbx4YdSI0ehfBSHApWCnUD5oRAW1-d25saBnImkY1qcYCm5SH264dOhwCBvEAYq1XKRK1A/exec";

  const encodedItems = encodeURIComponent(JSON.stringify(cart));
  const url = `${sheetURL}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&phone=${encodeURIComponent(phone)}&items=${encodedItems}&total=${totalAmount}`;

  fetch(url)
    .then(() => {
      const data = new URLSearchParams();
      data.append("userSecretKey", "r1w0bv75-rlqt-k35b-gqal-mzxse5so0x2l");
      data.append("categoryCode", "44ubvkc8");
      data.append("billName", "Pembayaran eKlinik");
      data.append("billDescription", "Bayaran ubat/ujian/prosedur dari eKlinik");
      data.append("billAmount", (totalAmount * 100).toString()); // dalam sen
      data.append("billEmail", email);
      data.append("billPhone", phone);
      data.append("billTo", name);
      data.append("billReturnUrl", "https://aizatsofian.github.io/eklinik/");
      data.append("billCallbackUrl", "https://aizatsofian.github.io/eklinik/success.html");

      return fetch("https://toyyibpay.com/index.php/api/createBill", {
        method: "POST",
        body: data
      });
    })
    .then(response => response.json())
    .then(result => {
      if (result[0]?.BillCode) {
        localStorage.removeItem("cart"); // kosongkan troli
        window.location.href = `https://toyyibpay.com/${result[0].BillCode}`;
      } else {
        alert("Gagal cipta bil.");
        console.error(result);
      }
    })
    .catch(err => {
      console.error("Ralat semasa proses:", err);
      alert("Ralat semasa proses bayaran.");
    });
}
