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

  // Hantar data ke Google Sheet guna POST
  fetch(sheetURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      email,
      phone,
      items: cart,
      total: totalAmount
    }),
  })
    .then(() => {
      const data = new URLSearchParams();
      data.append("userSecretKey", "r1w0bv75-rlqt-k35b-gqal-mzxse5so0x2l");
      data.append("categoryCode", "44ubvkc8");
      data.append("billName", "Pembayaran eKlinik");
      data.append("billDescription", "Bayaran ubat/ujian/prosedur dari eKlinik");
      data.append("billAmount", (totalAmount * 100).toString()); // sen
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
