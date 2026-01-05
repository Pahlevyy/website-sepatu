const express = require('express');
const fs = require('fs');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend Sepatu API is running 🚀');
});

//ambil data
app.get('/testimoni', (req, res) => {
  const data = fs.readFileSync('testimoni.json');
  res.json(JSON.parse(data));
});

//tambah testimoni
app.post('/testimoni', (req, res) => {
  const { nama, role, komentar } = req.body;

  if (!nama || !role || !komentar) {
    return res.status(400).json({ error: 'Nama, role, dan komentar diperlukan' });
  }

  const data = JSON.parse(fs.readFileSync('testimoni.json'));
  data.push({ nama, role, komentar });

  fs.writeFileSync('testimoni.json', JSON.stringify(data, null, 2));
  res.json({ message: 'testimoni berhasil ditambahkan' });
});

app.listen(PORT, () => {
  console.log(`Server jalan di http://localhost:${PORT}`);
});

//ambil data orders
app.get('/orders', (req, res) => {
  const data = fs.readFileSync('orders.json');
  console.log('ORDER MASUK:', req.body);
  res.json(JSON.parse(data));
});

app.post('/order', (req, res) => {
  const { nama, sepatu, domisili } = req.body;

  if (!nama || !sepatu || !domisili) {
    return res.status(400).json({ error: 'Nama, sepatu, dan domisili diperlukan' });
  }

  const orders = JSON.parse(fs.readFileSync('orders.json'));
  orders.push({ nama, sepatu, domisili });

  fs.writeFileSync('orders.json', JSON.stringify(orders, null, 2));

  res.json({ message: 'Order berhasil disimpan' });
});
