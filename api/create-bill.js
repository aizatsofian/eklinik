export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  const { name, email, phone, total } = req.body;

  if (!name || !email || !phone || !total) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const data = new URLSearchParams();
  data.append("userSecretKey", "r1w0bv75-rlqt-k35b-gqal-mzxse5so0x2l");
  data.append("categoryCode", "44ubvkc8");
  data.append("billName", "Pembayaran eKlinik");
  data.append("billDescription", "Bayaran ubat/ujian/prosedur dari eKlinik");
  data.append("billPriceSetting", "1");
  data.append("billPayorInfo", "1");
  data.append("billAmount", (total * 100).toString());
  data.append("billEmail", email);
  data.append("billPhone", phone);
  data.append("billTo", name);
  data.append("billReturnUrl", "https://eklinik.pages.dev/success.html");
  data.append("billCallbackUrl", "https://eklinik.pages.dev/success.html");

  try {
    const response = await fetch("https://toyyibpay.com/index.php/api/createBill", {
      method: "POST",
      body: data,
    });

    const result = await response.json();

    if (result[0]?.BillCode) {
      return res.status(200).json({ success: true, billCode: result[0].BillCode });
    } else {
      return res.status(500).json({ success: false, message: result });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
