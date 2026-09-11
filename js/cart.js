// ===== CART MANAGEMENT =====

let cart = JSON.parse(localStorage.getItem("cart")) || { restaurantId: null, restaurantName: "", items: [] };

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartUI();
}

function addToCart(item, restaurantId, restaurantName) {
  // If adding from a different restaurant, confirm
  if (cart.restaurantId && cart.restaurantId !== restaurantId && cart.items.length > 0) {
    if (!confirm(`Your cart has items from ${cart.restaurantName}. Start a new cart from ${restaurantName}?`)) return;
    cart = { restaurantId: null, restaurantName: "", items: [] };
  }

  cart.restaurantId = restaurantId;
  cart.restaurantName = restaurantName;

  const existing = cart.items.find(i => i.id === item.id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.items.push({ ...item, qty: 1 });
  }

  saveCart();
  showCartNotification(item.name);
  openCart();
}

function removeFromCart(itemId) {
  cart.items = cart.items.filter(i => i.id !== itemId);
  if (cart.items.length === 0) {
    cart.restaurantId = null;
    cart.restaurantName = "";
  }
  saveCart();
}

function updateQty(itemId, delta) {
  const item = cart.items.find(i => i.id === itemId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(itemId);
  } else {
    saveCart();
  }
}

function clearCart() {
  cart = { restaurantId: null, restaurantName: "", items: [] };
  saveCart();
}

function getCartTotal() {
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getCartCount() {
  return cart.items.reduce((sum, item) => sum + item.qty, 0);
}

function updateCartUI() {
  const countEl = document.getElementById("cartCount");
  if (countEl) countEl.textContent = getCartCount();

  const itemsContainer = document.getElementById("cartItems");
  const footer = document.getElementById("cartFooter");
  const restNameEl = document.getElementById("cartRestaurantName");
  const subtotalEl = document.getElementById("cartSubtotal");
  const grandTotalEl = document.getElementById("cartGrandTotal");

  if (!itemsContainer) return;

  if (restNameEl) {
    restNameEl.textContent = cart.restaurantName ? `From: ${cart.restaurantName}` : "";
  }

  if (cart.items.length === 0) {
    itemsContainer.innerHTML = `<div class="cart-empty"><i class="fas fa-shopping-basket"></i><p>Your cart is empty</p></div>`;
    if (footer) footer.style.display = "none";
    return;
  }

  itemsContainer.innerHTML = cart.items.map(item => `
    <div class="cart-item">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.emoji || ""} ${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-qty">
        <button class="qty-btn" onclick="updateQty(${item.id}, -1)"><i class="fas fa-minus"></i></button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="updateQty(${item.id}, 1)"><i class="fas fa-plus"></i></button>
      </div>
    </div>
  `).join("");

  const subtotal = getCartTotal();
  const deliveryFee = 2.99;
  const grand = subtotal + deliveryFee;

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (grandTotalEl) grandTotalEl.textContent = `$${grand.toFixed(2)}`;
  if (footer) footer.style.display = "block";
}

function openCart() {
  document.getElementById("cartSidebar")?.classList.add("open");
  document.getElementById("cartOverlay")?.classList.add("active");
}

function closeCart() {
  document.getElementById("cartSidebar")?.classList.remove("open");
  document.getElementById("cartOverlay")?.classList.remove("active");
}

function toggleCart(e) {
  if (e) e.preventDefault();
  const sidebar = document.getElementById("cartSidebar");
  if (sidebar?.classList.contains("open")) {
    closeCart();
  } else {
    openCart();
  }
}

function showCartNotification(itemName) {
  const existing = document.getElementById("cartNotif");
  if (existing) existing.remove();

  const notif = document.createElement("div");
  notif.id = "cartNotif";
  notif.style.cssText = `
    position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
    background: #2d2d2d; color: white; padding: 12px 24px; border-radius: 50px;
    font-size: 0.9rem; font-weight: 600; z-index: 9999; box-shadow: 0 8px 24px rgba(0,0,0,0.2);
    display: flex; align-items: center; gap: 8px; animation: slideUp 0.3s ease;
  `;
  notif.innerHTML = `<i class="fas fa-check-circle" style="color:#4caf50"></i> ${itemName} added to cart`;
  document.body.appendChild(notif);

  const style = document.createElement("style");
  style.textContent = `@keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(20px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);

  setTimeout(() => notif.remove(), 2500);
}

// Init UI on page load
document.addEventListener("DOMContentLoaded", updateCartUI);
