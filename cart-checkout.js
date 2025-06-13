// cart-checkout.js

function handleCheckout() {
  console.log("Memulakan proses checkout...");

  // 1. Dapatkan data dari troli dan borang
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Troli kosong!");
    console.log("Proses dihentikan: Troli kosong.");
    return;
  }

  const name = document.getElementById("cust-name").value.trim();
  const email = document.getElementById("cust-email").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();

  const phoneIsValid = /^[0-9]+$/.test(phone);

  if (!name || !email || !phone || !phoneIsValid) {
    alert("Sila lengkapkan maklumat pelanggan dengan nombor telefon sah.");
    console.log("Proses dihentikan: Maklumat tidak lengkap atau nombor telefon tidak sah.");
    return;
  }

  console.log("Maklumat pelanggan dan troli telah disahkan.");

  // 2. Kira jumlah keseluruhan
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 3. Hantar data ke Google Apps Script backend
  fetch("https://script.google.com/macros/s/AKfycbxSF8OSffhWdaYEozrUPkRlL7HFI96K9RrBaEhu_1R62j-S6koTYFIvaJORgllboyqfxw/exec", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      total: totalAmount
    }),
  })
  .then(res => res.json())
  .then(result => {
    if (result.success && result.billCode) {
      localStorage.removeItem("cart");
      console.log("Troli dikosongkan. Mengubah hala ke laman pembayaran...");
      window.location.href = `https://toyyibpay.com/${result.billCode}`;
    } else {
      console.error("Gagal cipta bil:", result);
      alert("Gagal cipta bil pembayaran. Sila cuba semula.");
    }
  })
  .catch(err => {
    console.error("Ralat semasa hubungi backend:", err);
    alert("Ralat rangkaian. Sila cuba semula.");
  });
}
