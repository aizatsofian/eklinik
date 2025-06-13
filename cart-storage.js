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
