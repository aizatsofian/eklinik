// cart-checkout.js

// cart-checkout.js

function handleCheckout() {
  console.log("Memulakan proses checkout...");

  // 1. Dapatkan data dari troli dan borang
  console.log("Memulakan proses checkout...");

  // 1. Dapatkan data dari troli dan borang
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    alert("Troli kosong!");
    console.log("Proses dihentikan: Troli kosong.");
    console.log("Proses dihentikan: Troli kosong.");
    return;
  }

  const name = document.getElementById("cust-name").value.trim();
  const email = document.getElementById("cust-email").value.trim();
  const phone = document.getElementById("cust-phone").value.trim();

  if (!name || !email || !phone) {
    alert("Sila lengkapkan maklumat pelanggan.");
    console.log("Proses dihentikan: Maklumat pelanggan tidak lengkap.");
    console.log("Proses dihentikan: Maklumat pelanggan tidak lengkap.");
    return;
  }

  console.log("Maklumat pelanggan dan troli telah disahkan.");

  // 2. Sediakan data untuk dihantar
  console.log("Maklumat pelanggan dan troli telah disahkan.");

  // 2. Sediakan data untuk dihantar
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const sheetURL = "https://script.google.com/macros/s/AKfycbx4YdSI0ehfBSHApWCnUD5oRAW1-d25saBnImkY1qcYCm5SH264dOhwCBvEAYq1XKRK1A/exec";
  
  const dataForGoogle = {
    name,
    email,
    phone,
    items: cart,
    total: totalAmount
  };

  console.log("Menghantar data ke Google Sheet...");

  // 3. Hantar data ke Google Sheet
  
  const dataForGoogle = {
    name,
    email,
    phone,
    items: cart,
    total: totalAmount
  };

  console.log("Menghantar data ke Google Sheet...");

  // 3. Hantar data ke Google Sheet
  fetch(sheetURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataForGoogle),
  })
  .then(response => {
    if (!response.ok) {
      // Jika Google Script mengembalikan ralat (cth: 500, 404)
      throw new Error(`Ralat dari server Google: Status ${response.status}`);
    }
    console.log("Data berjaya dihantar ke Google Sheet.");
    return response.text();
    body: JSON.stringify(dataForGoogle),
  })
  .then(response => {
    if (!response.ok) {
      // Jika Google Script mengembalikan ralat (cth: 500, 404)
      throw new Error(`Ralat dari server Google: Status ${response.status}`);
    }
    console.log("Data berjaya dihantar ke Google Sheet.");
    return response.text();
  })
  .then(googleResponse => {
    console.log("Respons dari Google:", googleResponse);
    console.log("Menyediakan data untuk ToyyibPay...");

    // 4. Sediakan data untuk ToyyibPay
    const dataForToyyib = new URLSearchParams();
    dataForToyyib.append("userSecretKey", "r1w0bv75-rlqt-k35b-gqal-mzxse5so0x2l");
    dataForToyyib.append("categoryCode", "44ubvkc8");
    dataForToyyib.append("billName", "Pembayaran eKlinik");
    dataForToyyib.append("billDescription", "Bayaran ubat/ujian/prosedur dari eKlinik");
    dataForToyyib.append("billAmount", (totalAmount * 100).toString());
    dataForToyyib.append("billEmail", email);
    dataForToyyib.append("billPhone", phone);
    dataForToyyib.append("billTo", name);
    dataForToyyib.append("billReturnUrl", "https://aizatsofian.github.io/eklinik/");
    dataForToyyib.append("billCallbackUrl", "https://aizatsofian.github.io/eklinik/success.html");
  .then(googleResponse => {
    console.log("Respons dari Google:", googleResponse);
    console.log("Menyediakan data untuk ToyyibPay...");

    // 4. Sediakan data untuk ToyyibPay
    const dataForToyyib = new URLSearchParams();
    dataForToyyib.append("userSecretKey", "r1w0bv75-rlqt-k35b-gqal-mzxse5so0x2l");
    dataForToyyib.append("categoryCode", "44ubvkc8");
    dataForToyyib.append("billName", "Pembayaran eKlinik");
    dataForToyyib.append("billDescription", "Bayaran ubat/ujian/prosedur dari eKlinik");
    dataForToyyib.append("billAmount", (totalAmount * 100).toString());
    dataForToyyib.append("billEmail", email);
    dataForToyyib.append("billPhone", phone);
    dataForToyyib.append("billTo", name);
    dataForToyyib.append("billReturnUrl", "https://aizatsofian.github.io/eklinik/");
    dataForToyyib.append("billCallbackUrl", "https://aizatsofian.github.io/eklinik/success.html");

    console.log("Menghantar permintaan 'createBill' ke ToyyibPay...");
    
    // 5. Hantar data ke ToyyibPay
    return fetch("https://toyyibpay.com/index.php/api/createBill", {
      method: "POST",
      body: dataForToyyib
    });
  })
  .then(response => response.json())
  .then(result => {
    console.log("Respons diterima dari ToyyibPay:", result);
    
    // 6. Kendalikan respons dari ToyyibPay
    if (result[0]?.BillCode) {
      console.log("BillCode berjaya dicipta:", result[0].BillCode);
      localStorage.removeItem("cart"); // Kosongkan troli
      console.log("Troli dikosongkan. Mengubah hala ke laman pembayaran...");
      window.location.href = `https://toyyibpay.com/${result[0].BillCode}`;
    } else {
      console.error("Gagal mencipta BillCode. Respons dari ToyyibPay:", result);
      alert("Gagal mencipta bil pembayaran. Sila rujuk konsol untuk ralat.");
    }
  })
  .catch(err => {
    // 7. Tangkap sebarang ralat dalam keseluruhan proses
    console.error("Satu ralat tidak dijangka telah berlaku dalam rantaian proses:", err);
    alert("Proses pembayaran gagal. Sila semak konsol untuk butiran teknikal.");
  });
    console.log("Menghantar permintaan 'createBill' ke ToyyibPay...");
    
    // 5. Hantar data ke ToyyibPay
    return fetch("https://toyyibpay.com/index.php/api/createBill", {
      method: "POST",
      body: dataForToyyib
    });
  })
  .then(response => response.json())
  .then(result => {
    console.log("Respons diterima dari ToyyibPay:", result);
    
    // 6. Kendalikan respons dari ToyyibPay
    if (result[0]?.BillCode) {
      console.log("BillCode berjaya dicipta:", result[0].BillCode);
      localStorage.removeItem("cart"); // Kosongkan troli
      console.log("Troli dikosongkan. Mengubah hala ke laman pembayaran...");
      window.location.href = `https://toyyibpay.com/${result[0].BillCode}`;
    } else {
      console.error("Gagal mencipta BillCode. Respons dari ToyyibPay:", result);
      alert("Gagal mencipta bil pembayaran. Sila rujuk konsol untuk ralat.");
    }
  })
  .catch(err => {
    // 7. Tangkap sebarang ralat dalam keseluruhan proses
    console.error("Satu ralat tidak dijangka telah berlaku dalam rantaian proses:", err);
    alert("Proses pembayaran gagal. Sila semak konsol untuk butiran teknikal.");
  });
}