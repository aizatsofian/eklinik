/**
 * Fail ini bertanggungjawab untuk memulakan semua fungsi skrip troli beli-belah
 * sebaik sahaja halaman web telah dimuatkan sepenuhnya.
 */

// 'DOMContentLoaded' adalah event listener yang memastikan kod di dalamnya
// hanya berjalan selepas semua elemen HTML telah siap dibina oleh pelayar.
// Ini adalah amalan terbaik untuk mengelakkan ralat 'element not found'.
document.addEventListener("DOMContentLoaded", function() {
  
  // 1. Panggil fungsi loadCart() untuk memaparkan item-item di dalam troli.
  //    Fungsi ini datang dari fail 'cart-display.js'.
  console.log("Halaman sedia. Memuatkan troli...");
  loadCart();

  // 2. Cari butang "Check Out" dan tambah 'event listener' padanya.
  const checkoutBtn = document.querySelector('.checkout-btn');
  
  // Lakukan semakan untuk memastikan butang tersebut wujud sebelum menambah listener.
  if (checkoutBtn) {
    // Apabila butang 'Check Out' ditekan, jalankan fungsi handleCheckout().
    // Fungsi ini datang dari fail 'cart-checkout.js'.
    checkoutBtn.addEventListener('click', handleCheckout);
    console.log("Event listener untuk butang 'Check Out' telah berjaya ditambah.");
  } else {
    // Paparkan ralat di konsol jika butang tidak ditemui.
    // Ini membantu untuk proses penyahpepijatan pada masa hadapan.
    console.error("Butang 'Check Out' dengan kelas '.checkout-btn' tidak ditemui dalam HTML.");
  }

});