document.addEventListener("DOMContentLoaded", function() {
  // Kod ini hanya akan berjalan selepas keseluruhan HTML dimuatkan
  const cartBody = document.getElementById("cart-body");
  const totalDisplay = document.getElementById("total");

  // Pastikan elemen wujud sebelum menambah event listener
  const checkoutBtn = document.querySelector('.checkout-btn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', handleCheckout);
  } else {
    console.error("Butang Checkout tidak ditemui!");
  }

  // Muatkan troli
  loadCart();
});
