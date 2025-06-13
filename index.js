function addToCart(item) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(i => i.id === item.id);
    if (existing) {
        existing.qty += 1;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(item.name + " telah ditambah ke dalam troli.");
}

// Navigasi ke halaman cart
document.getElementById("cart-icon").onclick = function () {
    window.location.href = "cart.html";
};
