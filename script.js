let cart = JSON.parse(localStorage.getItem("cart")) || {};
const PRICE = 10;

function updateCartCount() {
  let count = Object.values(cart).reduce((a, b) => a + b, 0);
  document.querySelectorAll("#cartCount").forEach(el => el.textContent = count);
}

function changeQty(id, delta) {
  let qtyEl = document.getElementById(`qty-${id}`);
  let qty = Math.max(1, parseInt(qtyEl.textContent) + delta);
  qtyEl.textContent = qty;
}

function addToCart(id) {
  let qty = parseInt(document.getElementById(`qty-${id}`).textContent);
  cart[id] = (cart[id] || 0) + qty;
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function loadCart() {
  const container = document.getElementById("cartItems");
  if (!container) return;

  container.innerHTML = "";
  let subtotal = 0;

  for (let id in cart) {
    let total = cart[id] * PRICE;
    subtotal += total;

    container.innerHTML += `
      <div>
        Item ${id} - $${PRICE} x ${cart[id]} = $${total}
        <button onclick="removeItem(${id})">❌</button>
      </div>
    `;
  }

  let tax = subtotal * 0.08;
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);
  document.getElementById("tax").textContent = tax.toFixed(2);
  document.getElementById("total").textContent = (subtotal + tax).toFixed(2);
}

function removeItem(id) {
  delete cart[id];
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
  updateCartCount();
}

function checkout() {
  alert("Thank you for your order!");
  cart = {};
  localStorage.removeItem("cart");
  loadCart();
  updateCartCount();
}

document.getElementById("themeToggle")?.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

updateCartCount();
loadCart();
