/**
 * Memuatkan item dari localStorage dan memaparkannya dalam jadual troli.
 * Ia juga mengira dan memaparkan jumlah keseluruhan.
 */
function loadCart() {
  // Dapatkan elemen DOM utama dari dalam fungsi ini
  const cartBody = document.getElementById("cart-body");
  const totalDisplay = document.getElementById("total");

  // Hentikan fungsi jika elemen penting tidak ditemui untuk mengelakkan ralat
  if (!cartBody || !totalDisplay) {
    console.error("Elemen troli (cart-body atau total) tidak ditemui. Sila semak HTML anda.");
    return;
  }

  // Dapatkan data troli dari localStorage atau cipta array kosong jika tiada
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Kosongkan kandungan troli sedia ada sebelum memaparkan yang baru
  cartBody.innerHTML = "";

  let grandTotal = 0;

  // Loop setiap item dalam troli untuk dipaparkan
  cart.forEach((item, index) => {
    // Pastikan data item lengkap sebelum membuat pengiraan
    if (typeof item.price !== 'number' || typeof item.qty !== 'number') {
        console.error("Data item tidak lengkap atau rosak:", item);
        return; // Langkau item ini dan teruskan dengan item seterusnya
    }

    const itemTotal = item.price * item.qty;
    grandTotal += itemTotal;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>
        <img src="${item.img || 'placeholder.png'}" width="40" alt="${item.name}"><br>
        ${item.name || 'Nama Tidak Ditemui'}
      </td>
      <td>RM${item.price.toFixed(2)}</td>
      <td>
        <button onclick="updateQty(${item.id}, -1)">-</button>
        <input type="text" value="${item.qty}" readonly>
        <button onclick="updateQty(${item.id}, 1)">+</button>
      </td>
      <td>RM${itemTotal.toFixed(2)}</td>
      <td><button class="delete-btn" onclick="removeItem(${item.id})">Delete</button></td>
    `;
    cartBody.appendChild(row);
  });

  // Paparkan jumlah keseluruhan
  totalDisplay.textContent = `Total : RM ${grandTotal.toFixed(2)}`;
}