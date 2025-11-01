// --- SCRIPT KERANJANG WARUNG NGEMIL ---
let cart = [];

const addButtons = document.querySelectorAll(".add-btn");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const cartTotalBottom = document.getElementById("cart-total-bottom");
const cartItemsContainer = document.getElementById("cart-items");
const checkoutBtn = document.getElementById("checkout-btn");

addButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const card = btn.parentElement;
    const nama = card.dataset.nama;
    const harga = parseInt(card.dataset.harga);
    const existing = cart.find(item => item.nama === nama);

    if (existing) {
      existing.qty++;
    } else {
      cart.push({ nama, harga, qty: 1 });
    }

    updateCart();
  });
});

function updateCart() {
  // Hitung total item & harga
  let totalQty = 0;
  let totalHarga = 0;
  cartItemsContainer.innerHTML = "";

  cart.forEach(item => {
    totalQty += item.qty;
    totalHarga += item.harga * item.qty;

    const div = document.createElement("div");
    div.style.border = "1px solid #ffe2a8";
    div.style.borderRadius = "10px";
    div.style.background = "#fff";
    div.style.padding = "8px 10px";
    div.style.marginBottom = "8px";
    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;font-size:0.9rem;">
        <span>${item.nama} x ${item.qty}</span>
        <span>Rp ${(item.harga * item.qty).toLocaleString()}</span>
      </div>
    `;
    cartItemsContainer.appendChild(div);
  });

  cartCount.textContent = totalQty;
  cartTotal.textContent = totalHarga.toLocaleString();
  cartTotalBottom.textContent = totalHarga.toLocaleString();

  // Buat link ke order.html
  const pesananStr = cart.map(i => `${i.nama} (${i.qty})`).join(", ");
  checkoutBtn.href = `order.html?pesanan=${encodeURIComponent(pesananStr)}&total=${totalHarga}`;
}
