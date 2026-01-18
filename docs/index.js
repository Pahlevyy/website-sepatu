function openProduct(el) {
  document.getElementById('productModal').style.display = 'flex';
  document.getElementById('modalImg').src = el.src;
  document.getElementById('modalName').innerText = el.dataset.name;
  document.getElementById('modalDesc').innerText = el.dataset.desc;
  document.getElementById('modalPrice').innerText = el.dataset.price;
}

function closeProduct() {
  document.getElementById('productModal').style.display = 'none';
}

const select = document.getElementById('domisili');
const label = document.getElementById('cityLabel');

select.addEventListener('change', function () {
  label.textContent = this.value;
  label.style.color = '#000';
});

fetch('http://localhost:3000/testimoni')
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector('.testimoni-container');
    container.innerHTML = '';

    data.forEach((item) => {
      container.innerHTML += `
        <div class="testimoni-card">
          <p class="komen">"${item.komentar}"</p>
          <h4>${item.nama}</h4>
          <span>${item.role}</span>
        </div>
      `;
    });
  });

document.getElementById('orderForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const data = {
    nama: document.getElementById('nama').value,
    sepatu: document.getElementById('kota').value,
    domisili: document.getElementById('domisili').value,
  };

  fetch('http://localhost:3000/order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert('Pesanan berhasil disimpan!');
      this.reset();
    })
    .catch((err) => console.error(err));
});

function goCheckout() {
  const nama = document.getElementById('modalName').innerText;
  const hargaText = document.getElementById('modalPrice').innerText.replace(/[^\d]/g, '');
  const gambar = document.getElementById('modalImg').src;

  window.location.href = `checkout.html?produk=${encodeURIComponent(nama)}&harga=${hargaText}&gambar=${encodeURIComponent(gambar)}`;
}
