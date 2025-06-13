const baseId = "appDZ2Tz8aYPqYbYu";
const tableName = "Table 1";
const token = "patnrPBLc8iJTr54y.d6de1e0a65959d1640b92aa19aa318f818cddd49812ff77528941c47304b5031";
const endpoint = `https://api.airtable.com/v0/${baseId}/${tableName}`;

async function fetchProducts() {
  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const grid = document.getElementById('product-grid');
  grid.innerHTML = data.records.map(record => {
    const imgUrl = record.fields.image?.[0]?.url || '';
    return `
      <div class="product">
        <a href="product.html?id=${record.fields.id}">
          <img src="${imgUrl}" alt="${record.fields.name}" />
          <h2>${record.fields.name}</h2>
          <p>₹${record.fields.price}</p>
        </a>
      </div>
    `;
  }).join('');
}

async function fetchProductDetail(id) {
  const res = await fetch(endpoint + `?filterByFormula={id}='${id}'`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const record = data.records[0];
  const detail = document.getElementById('product-detail');
  if (record) {
    const imgUrl = record.fields.image?.[0]?.url || '';
    detail.innerHTML = `
      <h1>${record.fields.name}</h1>
      <img src="${imgUrl}" alt="${record.fields.name}" />
      <p>${record.fields.description}</p>
      <strong>Price: ₹${record.fields.price}</strong>
    `;
  } else {
    detail.innerHTML = '<p>Product not found.</p>';
  }
}

if (document.getElementById('product-grid')) fetchProducts();
