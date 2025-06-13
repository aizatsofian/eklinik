const cartBody = document.getElementById("cart-body");
const totalDisplay = document.getElementById("total");

window.onload = () => {
  loadCart();
  const checkoutBtn = document.querySelector('.checkout-btn');
  checkoutBtn.addEventListener('click', handleCheckout);
};
