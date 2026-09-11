// ===== ADMIN PANEL =====

function initAdmin() {
  loadAdminStats();
  loadPendingApprovals();
  loadAdminRecentOrders();
  loadAdminRestaurants();
  loadAdminUsers();
  loadAdminOrders();
  loadAdminReviews();
}

// ===== STATS =====

function loadAdminStats() {
  const orders = getAllOrders();
  const revenue = orders.reduce((s, o) => s + parseFloat(o.total), 0);
  document.getElementById("adminStatRestaurants").textContent = RESTAURANTS.length;
  document.getElementById("adminStatUsers").textContent = MOCK_USERS.length;
  document.getElementById("adminStatOrders").textContent = orders.length;
  document.getElementById("adminStatRevenue").textContent = `$${revenue.toFixed(2)}`;
}

function getAllOrders() {
  const stored = JSON.parse(localStorage.getItem("orders")) || [];
  return [...MOCK_ORDERS, ...stored];
}

// ===== PENDING APPROVALS =====

function loadPendingApprovals() {
  const container = document.getElementById("pendingApprovals");
  // Simulate pending restaurants
  const pending = [
    { id: 99, name: "The Curry House", cuisine: "Indian", owner: "Raj Kumar", emoji: "🍛" },
    { id: 98, name: "Noodle Bar Express", cuisine: "Chinese", owner: "Lin Chen", emoji: "🍜" }
  ];
  container.innerHTML = pending.map(r => `
    <div class="admin-rest-card">
      <div class="admin-rest-emoji">${r.emoji}</div>
      <div class="admin-rest-info">
        <h4>${r.name}</h4>
        <p>${r.cuisine} • Owner: ${r.owner}</p>
      </div>
      <div class="admin-rest-actions">
        <button class="action-btn approve" onclick="approveRestaurant(${r.id}, this)">Approve</button>
        <button class="action-btn reject" onclick="rejectRestaurant(${r.id}, this)">Reject</button>
      </div>
    </div>
  `).join("") || "<p style='color:var(--text-light);'>No pending approvals.</p>";
}

function approveRestaurant(id, btn) {
  btn.closest(".admin-rest-card").style.opacity = "0.5";
  btn.closest(".admin-rest-card").innerHTML += `<span style="color:var(--success);font-weight:700;margin-left:auto;">✓ Approved</span>`;
  btn.parentElement.innerHTML = "";
}

function rejectRestaurant(id, btn) {
  btn.closest(".admin-rest-card").remove();
}

// ===== RECENT ORDERS =====

function loadAdminRecentOrders() {
  const orders = getAllOrders().slice(-4).reverse();
  document.getElementById("adminRecentOrders").innerHTML = orders.map(o => `
    <div style="display:flex;justify-content:space-between;padding:10px 0;border-bottom:1px solid #f0f0f0;font-size:0.88rem;">
      <div><strong>${o.id}</strong><br><span style="color:var(--text-light);">${o.customer || o.name}</span></div>
      <div style="text-align:right;"><strong>$${parseFloat(o.total).toFixed(2)}</strong><br><span class="status-badge status-${o.status}">${formatAdminStatus(o.status)}</span></div>
    </div>
  `).join("");
}

// ===== RESTAURANTS =====

function loadAdminRestaurants(filter = "all") {
  const tbody = document.getElementById("adminRestaurantsBody");
  const restaurants = [
    ...RESTAURANTS.map(r => ({ ...r, approvalStatus: "approved" })),
    { id: 99, name: "The Curry House", cuisine: "Indian", emoji: "🍛", rating: 0, owner: "Raj Kumar", approvalStatus: "pending" },
    { id: 98, name: "Noodle Bar Express", cuisine: "Chinese", emoji: "🍜", rating: 0, owner: "Lin Chen", approvalStatus: "pending" }
  ];
  const filtered = filter === "all" ? restaurants : restaurants.filter(r => r.approvalStatus === filter);

  tbody.innerHTML = filtered.map(r => `
    <tr>
      <td>${r.emoji} <strong>${r.name}</strong></td>
      <td>${r.cuisine}</td>
      <td>${r.owner || "Owner"}</td>
      <td>${r.rating ? `<span style="color:var(--accent);">★</span> ${r.rating}` : "N/A"}</td>
      <td><span class="status-badge status-${r.approvalStatus === 'pending' ? 'pending-approval' : r.approvalStatus}">${r.approvalStatus}</span></td>
      <td>
        ${r.approvalStatus === "pending"
          ? `<button class="action-btn approve" onclick="this.closest('tr').remove()">Approve</button><button class="action-btn reject" onclick="this.closest('tr').remove()">Reject</button>`
          : `<button class="action-btn edit">Edit</button><button class="action-btn suspend" onclick="this.closest('tr').querySelector('.status-badge').textContent='suspended'">Suspend</button>`
        }
      </td>
    </tr>
  `).join("");
}

function filterAdminRestaurants() {
  const val = document.getElementById("adminRestFilter").value;
  loadAdminRestaurants(val);
}

// ===== USERS =====

function loadAdminUsers(query = "") {
  const tbody = document.getElementById("adminUsersBody");
  const users = MOCK_USERS.filter(u =>
    u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query)
  );
  tbody.innerHTML = users.map(u => `
    <tr>
      <td><strong>${u.name}</strong></td>
      <td>${u.email}</td>
      <td><span class="status-badge ${u.role === 'admin' ? 'status-approved' : u.role === 'owner' ? 'status-preparing' : 'status-out_for_delivery'}">${u.role}</span></td>
      <td>${u.joined}</td>
      <td>${u.orders}</td>
      <td>
        <button class="action-btn edit">Edit</button>
        <button class="action-btn delete" onclick="this.closest('tr').remove()">Remove</button>
      </td>
    </tr>
  `).join("");
}

function searchUsers() {
  const query = document.getElementById("userSearch").value.toLowerCase();
  loadAdminUsers(query);
}

// ===== ORDERS =====

function loadAdminOrders(filter = "all") {
  const tbody = document.getElementById("adminOrdersBody");
  const orders = getAllOrders().reverse();
  const filtered = filter === "all" ? orders : orders.filter(o => o.status === filter);
  tbody.innerHTML = filtered.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer || o.name || "Customer"}</td>
      <td>${o.restaurantName}</td>
      <td><strong>$${parseFloat(o.total).toFixed(2)}</strong></td>
      <td><span class="status-badge status-${o.status}">${formatAdminStatus(o.status)}</span></td>
      <td>${o.date || "2026-09-11"}</td>
    </tr>
  `).join("");
}

function filterAdminOrders() {
  const val = document.getElementById("adminOrderFilter").value;
  loadAdminOrders(val);
}

// ===== REVIEWS =====

function loadAdminReviews(filterRating = "all") {
  const allReviews = RESTAURANTS.flatMap(r =>
    r.reviews.map(rev => ({ ...rev, restaurantName: r.name, restaurantEmoji: r.emoji }))
  );
  const filtered = filterRating === "all" ? allReviews : allReviews.filter(r => r.rating === parseInt(filterRating));
  document.getElementById("adminReviewsList").innerHTML = filtered.map(r => `
    <div class="admin-review-card">
      <div class="admin-review-header">
        <div>
          <strong>${r.user}</strong>
          <span style="color:var(--text-light);font-size:0.82rem;margin-left:10px;">${r.restaurantEmoji} ${r.restaurantName}</span>
        </div>
        <div style="display:flex;align-items:center;gap:10px;">
          <span style="color:var(--accent);">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</span>
          <span style="color:var(--text-light);font-size:0.8rem;">${r.date}</span>
          <button class="action-btn delete" onclick="this.closest('.admin-review-card').remove()">Remove</button>
        </div>
      </div>
      <p style="font-size:0.88rem;">${r.text}</p>
    </div>
  `).join("") || "<p style='color:var(--text-light);padding:20px;'>No reviews found.</p>";
}

function filterAdminReviews() {
  const val = document.getElementById("reviewFilterAdmin").value;
  loadAdminReviews(val);
}

// ===== NAVIGATION =====

function showAdminSection(name) {
  document.querySelectorAll(".dash-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById(`admin-section-${name}`)?.classList.add("active");
  event.currentTarget.classList.add("active");
  document.getElementById("adminSectionTitle").textContent = "Admin — " + name.charAt(0).toUpperCase() + name.slice(1);
}

function toggleSidebar() {
  document.getElementById("sidebar")?.classList.toggle("open");
}

function formatAdminStatus(s) {
  return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

document.addEventListener("DOMContentLoaded", initAdmin);
