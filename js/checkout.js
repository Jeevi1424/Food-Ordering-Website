// ===== CHECKOUT PAGE =====

const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.08;
let appliedPromo = null;

function loadCheckout() {
  const cart = JSON.parse(localStorage.getItem("cart")) || { restaurantId: null, restaurantName: "", items: [] };

  if (!cart.items || cart.items.length === 0) {
    window.location.href = "restaurants.html";
    return;
  }

  // Pre-fill user details if logged in
  const user = getCurrentUser();
  if (user) {
    if (document.getElementById("fullName")) document.getElementById("fullName").value = user.name || "";
  }

  // Summary
  document.getElementById("summaryRestaurant").textContent = cart.restaurantName || "";
  renderSummaryItems(cart.items);
  updateTotals(cart.items);
}

function renderSummaryItems(items) {
  const container = document.getElementById("summaryItems");
  if (!container) return;
  container.innerHTML = items.map(item => `
    <div class="summary-item">
      <span class="summary-item-name">${item.emoji || ""} ${item.name} <span class="summary-item-qty">×${item.qty}</span></span>
      <span class="summary-item-price">$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join("");
}

function updateTotals(items, promoDiscount = 0) {
  const subtotal = items.reduce((s, i) => s + i.price * i.qty, 0);
  const afterDiscount = Math.max(0, subtotal - promoDiscount);
  const tax = afterDiscount * TAX_RATE;
  const total = afterDiscount + DELIVERY_FEE + tax;

  document.getElementById("summarySubtotal").textContent = `$${subtotal.toFixed(2)}`;
  document.getElementById("summaryTax").textContent = `$${tax.toFixed(2)}`;
  document.getElementById("summaryTotal").textContent = `$${total.toFixed(2)}`;
}

function selectPayment(method) {
  document.getElementById("stripeSection").style.display = method === "card" ? "block" : "none";
  document.getElementById("cashSection").style.display = method === "cash" ? "block" : "none";
  document.querySelectorAll(".payment-option").forEach(el => el.classList.remove("active"));
  if (method === "card") document.getElementById("payCard")?.classList.add("active");
  if (method === "cash") document.getElementById("payCash")?.classList.add("active");
}

function formatCard(input) {
  let val = input.value.replace(/\D/g, "").substring(0, 16);
  input.value = val.replace(/(.{4})/g, "$1 ").trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, "").substring(0, 4);
  if (val.length >= 3) val = val.substring(0, 2) + " / " + val.substring(2);
  input.value = val;
}

function applyPromo() {
  const code = document.getElementById("promoCode")?.value.trim().toUpperCase();
  const msgEl = document.getElementById("promoMsg");
  const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
  const subtotal = cart.items.reduce((s, i) => s + i.price * i.qty, 0);

  if (!code) { showPromoMsg("Enter a promo code.", "error"); return; }

  const promo = PROMO_CODES[code];
  if (!promo) { showPromoMsg("Invalid promo code.", "error"); appliedPromo = null; return; }

  if (promo.type === "fixed" && subtotal < 25) {
    showPromoMsg("This code requires a minimum order of $25.", "error");
    appliedPromo = null;
    return;
  }

  const discount = promo.type === "percent" ? (subtotal * promo.discount / 100) : promo.discount;
  appliedPromo = { code, discount, desc: promo.desc };

  showPromoMsg(`✓ ${promo.desc} — -$${discount.toFixed(2)} applied!`, "success");
  updateTotals(cart.items, discount);
}

function showPromoMsg(msg, type) {
  const el = document.getElementById("promoMsg");
  if (el) { el.textContent = msg; el.className = `promo-msg ${type}`; }
}

function validateCheckout() {
  const fields = [
    { id: "fullName",  label: "Full Name" },
    { id: "phone",     label: "Phone Number" },
    { id: "address",   label: "Delivery Address" },
    { id: "city",      label: "City" },
    { id: "zip",       label: "ZIP Code" }
  ];

  for (const f of fields) {
    const el = document.getElementById(f.id);
    if (!el || !el.value.trim()) {
      el?.focus();
      alert(`Please enter your ${f.label}.`);
      return false;
    }
  }

  const paymentMethod = document.querySelector('input[name="payment"]:checked')?.value;
  if (paymentMethod === "card") {
    const card = document.getElementById("cardNumber")?.value.replace(/\s/g, "");
    if (!card || card.length < 16) { alert("Please enter a valid card number."); return false; }
    const expiry = document.getElementById("cardExpiry")?.value;
    if (!expiry || expiry.length < 7) { alert("Please enter a valid expiry date."); return false; }
    const cvv = document.getElementById("cardCVV")?.value;
    if (!cvv || cvv.length < 3) { alert("Please enter a valid CVV."); return false; }
  }

  return true;
}

function placeOrder() {
  if (!validateCheckout()) return;

  const btn = document.getElementById("placeOrderBtn");
  if (btn) { btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'; }

  // Simulate Stripe processing
  setTimeout(() => {
    const cart = JSON.parse(localStorage.getItem("cart")) || { items: [] };
    const subtotal = cart.items.reduce((s, i) => s + i.price * i.qty, 0);
    const discount = appliedPromo ? appliedPromo.discount : 0;
    const afterDiscount = Math.max(0, subtotal - discount);
    const tax = afterDiscount * TAX_RATE;
    const total = afterDiscount + DELIVERY_FEE + tax;

    const order = {
      id: generateOrderId(),
      restaurantId: cart.restaurantId,
      restaurantName: cart.restaurantName,
      items: cart.items,
      subtotal,
      tax: tax.toFixed(2),
      total: total.toFixed(2),
      deliveryFee: DELIVERY_FEE,
      address: `${document.getElementById("address")?.value}, ${document.getElementById("city")?.value} ${document.getElementById("zip")?.value}`,
      phone: document.getElementById("phone")?.value,
      name: document.getElementById("fullName")?.value,
      payment: document.querySelector('input[name="payment"]:checked')?.value === "card" ? "Credit Card" : "Cash on Delivery",
      status: "pending",
      placedAt: new Date().toISOString(),
      estimatedDelivery: getEstimatedTime()
    };

    // Save order
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push(order);
    localStorage.setItem("orders", JSON.stringify(orders));
    localStorage.setItem("lastOrder", JSON.stringify(order));

    // Clear cart
    localStorage.removeItem("cart");

    window.location.href = "order-confirmation.html";
  }, 2000);
}

function getEstimatedTime() {
  const now = new Date();
  now.setMinutes(now.getMinutes() + 35);
  return now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

document.addEventListener("DOMContentLoaded", loadCheckout);
