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

  if (!name || !email || !phone) {
    alert("Sila lengkapkan maklumat pelanggan.");
    console.log("Proses dihentikan: Maklumat pelanggan tidak lengkap.");
    return;
  }

  console.log("Maklumat pelanggan dan troli telah disahkan.");

  // 2. Kira jumlah keseluruhan
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // 3. Sediakan data untuk ToyyibPay
  const dataForToyyib = new URLSearchParams();
  dataForToyyib.append("userSecretKey", "r1w0bv75-rlqt-k35b-gqal-mzxse5so0x2l");
  dataForToyyib.append("categoryCode", "44ubvkc8");
  dataForToyyib.append("billName", "Pembayaran eKlinik");
  dataForToyyib.append("billDescription", "Bayaran ubat/ujian/prosedur dari eKlinik");
  dataForToyyib.append("billAmount", (totalAmount * 100).toString()); // dalam sen
  dataForToyyib.append("billEmail", email);
  dataForToyyib.append("billPhone", phone);
  dataForToyyib.append("billTo", name);
  dataForToyyib.append("billReturnUrl", "https://aizatsofian.github.io/eklinik/");
  dataForToyyib.append("billCallbackUrl", "https://aizatsofian.github.io/eklinik/success.html");

  console.log("Menghantar permintaan 'createBill' ke ToyyibPay...");

  // 4. Hantar ke ToyyibPay
  fetch("https://toyyibpay.com/index.php/api/createBill", {
    method: "POST",
    body: dataForToyyib
  })
  .then(response => response.json())
  .then(result => {
    console.log("Respons diterima dari ToyyibPay:", result);
    if (result[0]?.BillCode) {
      localStorage.removeItem("cart");
      console.log("Troli dikosongkan. Mengubah hala ke laman pembayaran...");
      window.location.href = `https://toyyibpay.com/${result[0].BillCode}`;
    } else {
      console.error("Gagal mencipta BillCode. Respons:", result);
      alert("Gagal mencipta bil pembayaran. Sila semak konsol.");
    }
  })
  .catch(err => {
    console.error("Ralat semasa permintaan ke ToyyibPay:", err);
    alert("Proses pembayaran gagal. Sila semak konsol.");
  });
}
