/**
 * Mengemas kini kuantiti item dalam troli.
 * @param {number} id - ID produk yang unik.
 * @param {number} change - Perubahan pada kuantiti (contoh: 1 atau -1).
 */
function updateQty(id, change) {
  // Dapatkan data troli dari localStorage
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Cari item dalam troli berdasarkan ID
  const item = cart.find(i => i.id === id);
  if (!item) return; // Hentikan jika item tidak ditemui

  // Kemas kini kuantiti
  item.qty += change;
  
  // Pastikan kuantiti tidak kurang daripada 1
  if (item.qty < 1) {
    item.qty = 1;
  }
  
  // Simpan semula troli yang telah dikemas kini ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Muatkan semula paparan troli untuk menunjukkan perubahan
  loadCart();
}

/**
 * Membuang item dari troli.
 * @param {number} id - ID produk yang hendak dibuang.
 */
function removeItem(id) {
  // Dapatkan data troli dari localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  
  // Tapis keluar item yang sepadan dengan ID
  cart = cart.filter(i => i.id !== id);
  
  // Simpan semula troli yang telah dikemas kini ke localStorage
  localStorage.setItem("cart", JSON.stringify(cart));
  
  // Muatkan semula paparan troli untuk menunjukkan perubahan
  loadCart();
}