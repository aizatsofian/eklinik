/**
 * Fail ini bertanggungjawab untuk memulakan skrip troli beli-belah
 * sebaik sahaja halaman web telah dimuatkan sepenuhnya.
 */

// 'DOMContentLoaded' memastikan kod di dalamnya hanya berjalan selepas
// semua elemen HTML telah siap dibina oleh pelayar.
document.addEventListener("DOMContentLoaded", function() {
  
  // 1. Panggil fungsi loadCart() untuk memaparkan item troli.
  //    Fungsi ini datang dari fail cart-display.js
  console.log("Halaman sedia. Memuatkan troli...");
  loadCart();

  // 2. Cari butang "Check Out" dan tambah event listener padanya.
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  if (checkoutBtn) {
    // Apabila butang ditekan, jalankan fungsi handleCheckout().
    // Fungsi ini datang dari fail cart-checkout.js
    checkoutBtn.addEventListener('click', handleCheckout);
    console.log("Event listener untuk butang 'Check Out' telah ditambah.");
  } else {
    // Paparkan ralat jika butang tidak ditemui dalam HTML.
    console.error("Butang 'Check Out' dengan kelas '.checkout-btn' tidak ditemui.");
  }

});