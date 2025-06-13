document.addEventListener("DOMContentLoaded", () => {
  const airtableBase = "appDZ2Tz8aYPqYbYu";
  const tableName = "Table 1";
  const apiKey = "patnrPBLc8iJTr54y.d6de1e0a65959d1640b92aa19aa318f818cddd49812ff77528941c47304b5031";
  const container = document.getElementById("products");

  fetch(`https://api.airtable.com/v0/${airtableBase}/${tableName}`, {
    headers: { Authorization: `Bearer ${apiKey}` }
  })
  .then((res) => res.json())
  .then((data) => {
    data.records.forEach((record) => {
      const item = document.createElement("div");
      item.className = "product";
      item.innerHTML = `
        <img src="${record.fields.image[0].url}" alt="${record.fields.name}" style="width:100%; height:auto;" />
        <h3>${record.fields.name}</h3>
        <p>₹${record.fields.price}</p>
      `;
      container.appendChild(item);
    });
  });
});