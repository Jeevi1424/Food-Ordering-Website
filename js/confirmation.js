// ===== ORDER CONFIRMATION PAGE =====

let trackingInterval = null;
let currentStep = 1;

function loadConfirmation() {
  const order = JSON.parse(localStorage.getItem("lastOrder"));
  if (!order) {
    document.querySelector(".confirmation-wrapper").innerHTML = `
      <div class="container" style="text-align:center;padding:80px 20px;">
        <h2>No order found</h2>
        <a href="index.html" class="btn-primary" style="margin-top:20px;display:inline-block;">Go Home</a>
      </div>
    `;
    return;
  }

  // Order ID
  document.getElementById("orderId").textContent = order.id;

  // Details
  document.getElementById("confirmAddress").textContent = order.address;
  document.getElementById("confirmPayment").textContent = order.payment;
  document.getElementById("confirmRestaurant").textContent = order.restaurantName;
  document.getElementById("confirmTime").textContent = order.estimatedDelivery;
  document.getElementById("estimatedTime").textContent = order.estimatedDelivery;

  // Step 1 time
  const placedDate = new Date(order.placedAt);
  document.getElementById("step1Time").textContent = placedDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  // Items
  const itemsContainer = document.getElementById("confirmedItems");
  itemsContainer.innerHTML = order.items.map(item => `
    <div class="order-item-row">
      <span>${item.emoji || ""} ${item.name} ×${item.qty}</span>
      <span>$${(item.price * item.qty).toFixed(2)}</span>
    </div>
  `).join("");

  // Totals
  document.getElementById("confSubtotal").textContent = `$${parseFloat(order.subtotal).toFixed(2)}`;
  document.getElementById("confTax").textContent = `$${parseFloat(order.tax).toFixed(2)}`;
  document.getElementById("confTotal").textContent = `$${parseFloat(order.total).toFixed(2)}`;

  // Start tracking simulation
  startTracking();
}

function startTracking() {
  const steps = [
    { id: "step1", delay: 0 },
    { id: "step2", delay: 5000 },
    { id: "step3", delay: 12000 },
    { id: "step4", delay: 20000 }
  ];

  // Mark step 1 active immediately
  markStepActive(1);

  steps.forEach((step, index) => {
    if (index === 0) return; // already done
    setTimeout(() => {
      markStepActive(index + 1);
    }, step.delay);
  });
}

function markStepActive(stepNum) {
  // Mark all previous steps as completed
  for (let i = 1; i < stepNum; i++) {
    const el = document.getElementById(`step${i}`);
    if (el) { el.classList.remove("active"); el.classList.add("completed"); }
    // connector
    const conn = el?.nextElementSibling;
    if (conn?.classList.contains("track-connector")) conn.classList.add("active");
  }
  // Mark current step as active
  const current = document.getElementById(`step${stepNum}`);
  if (current) current.classList.add("active");
}

document.addEventListener("DOMContentLoaded", loadConfirmation);
