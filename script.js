document.getElementById('billDate').textContent = new Date().toLocaleDateString();
const items = [];

function formatCur(v) { return '₹' + Number(v).toFixed(2); }

function renderItems() {
  const tbody = document.querySelector('#itemsTable tbody');
  tbody.innerHTML = '';
  let total = 0;
  items.forEach((it, idx) => {
    total += it.qty * it.price;
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${idx+1}</td>
      <td>${it.category}</td>
      <td>${it.brand}</td>
      <td>${it.model}</td>
      <td>${it.variant}</td>
      <td>${it.qty}</td>
      <td>${formatCur(it.price)}</td>
      <td><svg id='sn-${idx}'></svg></td>
      <td><svg id='imei-${idx}'></svg></td>
      <td>${formatCur(it.qty*it.price)}</td>
    `;
    tbody.appendChild(tr);
    if(it.sn) JsBarcode(`#sn-${idx}`, it.sn, {format:'CODE128', width:1.2, height:40, displayValue:false});
    if(it.imei) JsBarcode(`#imei-${idx}`, it.imei, {format:'CODE128', width:1.2, height:40, displayValue:false});
  });
  document.getElementById('grandTotal').textContent = formatCur(total);
}

document.getElementById('addItem').addEventListener('click', () => {
  const category = document.getElementById('category').value;
  const brand = document.getElementById('brand').value || '-';
  const model = document.getElementById('model').value || '-';
  const variant = document.getElementById('variant').value || '-';
  const qty = Number(document.getElementById('qty').value) || 1;
  const price = Number(document.getElementById('price').value) || 0;
  const sn = document.getElementById('sn').value || '-';
  const imei = document.getElementById('imei').value || '-';
  items.push({category, brand, model, variant, qty, price, sn, imei});
  renderItems();
  document.getElementById('brand').value = '';
  document.getElementById('model').value = '';
  document.getElementById('variant').value = '';
  document.getElementById('qty').value = 1;
  document.getElementById('price').value = 0;
  document.getElementById('sn').value = '';
  document.getElementById('imei').value = '';
});

document.getElementById('showFestival').addEventListener('change', function() {
  document.getElementById('festivalMsg').style.display = this.checked ? 'block' : 'none';
});

function generateBill() {
  alert('Bill generated successfully!');
}

function printBill() {
  const originalContent = document.body.innerHTML;
  const billContent = document.getElementById('billContent').innerHTML;
  document.body.innerHTML = billContent;
  window.print();
  document.body.innerHTML = originalContent;
  window.location.reload();
}

// QR code for shop location
const qrContainer = document.getElementById('locationQR');
const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=11.0183,76.9614';
new QRCode(qrContainer, {text: mapsUrl, width: 100, height: 100});
