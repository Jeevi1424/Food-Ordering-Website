// ===== OWNER DASHBOARD =====

let ownerRestaurant = null;
let editingItemId = null;

function initDashboard() {
  const user = getCurrentUser();
  if (!user || (user.role !== "owner" && user.role !== "admin")) {
    // Demo mode
  }

  // Load owner's restaurant (default to first restaurant for demo)
  const restaurantId = user?.restaurantId || 1;
  ownerRestaurant = getRestaurantById(restaurantId);
  if (!ownerRestaurant) ownerRestaurant = RESTAURANTS[0];

  document.getElementById("ownerName").textContent = ownerRestaurant.name;

  loadStats();
  loadRecentOrders();
  loadTopItems();
  loadAllOrders();
  loadMenuTable();
  loadOwnerReviews();
  loadSettings();
}

function loadStats() {
  const orders = getOwnerOrders();
  const revenue = orders.reduce((s, o) => s + parseFloat(o.total), 0);
  const pending = orders.filter(o => o.status === "pending" || o.status === "preparing").length;
  const reviews = getOwnerReviews();
  const avgRating = reviews.length ? (reviews.reduce((s,r) => s+r.rating,0)/reviews.length).toFixed(1) : "N/A";

  document.getElementById("statTotalOrders").textContent = orders.length;
  document.getElementById("statRevenue").textContent = `$${revenue.toFixed(2)}`;
  document.getElementById("statRating").textContent = avgRating;
  document.getElementById("statPending").textContent = pending;
}

function getOwnerOrders() {
  const stored = JSON.parse(localStorage.getItem("orders")) || [];
  const mock = MOCK_ORDERS.filter(o => o.restaurantId === ownerRestaurant.id);
  return [...mock, ...stored.filter(o => o.restaurantId === ownerRestaurant.id)];
}

function getOwnerReviews() {
  const stored = localStorage.getItem(`reviews_${ownerRestaurant.id}`);
  const extra = stored ? JSON.parse(stored) : [];
  return [...ownerRestaurant.reviews, ...extra];
}

function loadRecentOrders() {
  const tbody = document.getElementById("recentOrdersBody");
  const orders = getOwnerOrders().slice(-5).reverse();
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer || o.name || "Customer"}</td>
      <td>${o.items.length} item${o.items.length !== 1 ? "s" : ""}</td>
      <td><strong>$${parseFloat(o.total).toFixed(2)}</strong></td>
      <td><span class="status-badge status-${o.status}">${formatStatus(o.status)}</span></td>
    </tr>
  `).join("") || `<tr><td colspan="5" style="text-align:center;color:var(--text-light);">No orders yet</td></tr>`;
}

function loadTopItems() {
  const orders = getOwnerOrders();
  const itemCounts = {};
  orders.forEach(o => o.items.forEach(item => {
    itemCounts[item.name] = (itemCounts[item.name] || 0) + item.qty;
  }));
  const sorted = Object.entries(itemCounts).sort((a,b) => b[1]-a[1]).slice(0,5);
  const max = sorted[0]?.[1] || 1;
  document.getElementById("topItems").innerHTML = sorted.map(([name, count]) => `
    <div class="top-item-row">
      <div>
        <div class="top-item-name">${name}</div>
        <div class="top-item-bar"><div class="top-item-bar-fill" style="width:${(count/max*100).toFixed(0)}%"></div></div>
      </div>
      <span class="top-item-count">${count} orders</span>
    </div>
  `).join("") || "<p style='color:var(--text-light);font-size:0.9rem;'>No data yet</p>";
}

function loadAllOrders() {
  const tbody = document.getElementById("allOrdersBody");
  const orders = getOwnerOrders().reverse();
  tbody.innerHTML = orders.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer || o.name || "Customer"}</td>
      <td>${o.items.map(i => i.name).join(", ")}</td>
      <td><strong>$${parseFloat(o.total).toFixed(2)}</strong></td>
      <td>${o.time || o.date || ""}</td>
      <td><span class="status-badge status-${o.status}">${formatStatus(o.status)}</span></td>
      <td>
        <select onchange="updateOrderStatus('${o.id}', this.value)" style="padding:5px 8px;border:1px solid var(--border);border-radius:6px;font-size:0.8rem;">
          <option value="">Update...</option>
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="out_for_delivery">Out for Delivery</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </td>
    </tr>
  `).join("") || `<tr><td colspan="7" style="text-align:center;color:var(--text-light);">No orders yet</td></tr>`;
}

function filterOrders() {
  const status = document.getElementById("orderStatusFilter").value;
  const orders = getOwnerOrders().reverse();
  const filtered = status === "all" ? orders : orders.filter(o => o.status === status);
  const tbody = document.getElementById("allOrdersBody");
  tbody.innerHTML = filtered.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer || o.name || "Customer"}</td>
      <td>${o.items.map(i=>i.name).join(", ")}</td>
      <td><strong>$${parseFloat(o.total).toFixed(2)}</strong></td>
      <td>${o.time || o.date || ""}</td>
      <td><span class="status-badge status-${o.status}">${formatStatus(o.status)}</span></td>
      <td>—</td>
    </tr>
  `).join("") || `<tr><td colspan="7" style="text-align:center;color:var(--text-light);">No orders</td></tr>`;
}

function updateOrderStatus(orderId, newStatus) {
  if (!newStatus) return;
  const orders = JSON.parse(localStorage.getItem("orders")) || [];
  const order = orders.find(o => o.id === orderId);
  if (order) {
    order.status = newStatus;
    localStorage.setItem("orders", JSON.stringify(orders));
    loadRecentOrders();
    loadStats();
  }
}

// ===== MENU MANAGEMENT =====

function getOwnerMenu() {
  const stored = localStorage.getItem(`menu_${ownerRestaurant.id}`);
  return stored ? JSON.parse(stored) : ownerRestaurant.menu;
}

function saveOwnerMenu(menu) {
  localStorage.setItem(`menu_${ownerRestaurant.id}`, JSON.stringify(menu));
}

function loadMenuTable(filterCat = "all") {
  const menu = getOwnerMenu();
  const tabs = document.getElementById("menuCategoryTabs");
  const tbody = document.getElementById("menuTableBody");

  // Build category tabs
  const categories = menu.map(c => c.category);
  tabs.innerHTML = `
    <button class="menu-cat-tab ${filterCat === 'all' ? 'active' : ''}" onclick="loadMenuTable('all')">All</button>
    ${categories.map(cat => `<button class="menu-cat-tab ${filterCat === cat ? 'active' : ''}" onclick="loadMenuTable('${cat}')">${cat}</button>`).join("")}
  `;

  const allItems = menu.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })));
  const filtered = filterCat === "all" ? allItems : allItems.filter(i => i.category === filterCat);

  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td>${item.emoji || ""} <strong>${item.name}</strong><br><small style="color:var(--text-light);">${item.desc || ""}</small></td>
      <td>${item.category}</td>
      <td><strong>$${item.price.toFixed(2)}</strong></td>
      <td><span class="status-badge status-approved">Active</span></td>
      <td>
        <button class="action-btn edit" onclick="openEditItemModal(${item.id})"><i class="fas fa-edit"></i></button>
        <button class="action-btn delete" onclick="deleteMenuItem(${item.id})"><i class="fas fa-trash"></i></button>
      </td>
    </tr>
  `).join("") || `<tr><td colspan="5" style="text-align:center;color:var(--text-light);">No items</td></tr>`;
}

function openAddItemModal() {
  editingItemId = null;
  document.getElementById("modalTitle").textContent = "Add Menu Item";
  document.getElementById("itemName").value = "";
  document.getElementById("itemCategory").value = "";
  document.getElementById("itemPrice").value = "";
  document.getElementById("itemDesc").value = "";
  document.getElementById("itemEmoji").value = "";
  document.getElementById("itemTags").value = "";
  document.getElementById("itemModal").style.display = "flex";
}

function openEditItemModal(itemId) {
  const menu = getOwnerMenu();
  const item = menu.flatMap(c => c.items).find(i => i.id === itemId);
  if (!item) return;
  editingItemId = itemId;
  document.getElementById("modalTitle").textContent = "Edit Menu Item";
  document.getElementById("itemName").value = item.name;
  document.getElementById("itemCategory").value = menu.find(c => c.items.some(i => i.id === itemId))?.category || "";
  document.getElementById("itemPrice").value = item.price;
  document.getElementById("itemDesc").value = item.desc || "";
  document.getElementById("itemEmoji").value = item.emoji || "";
  document.getElementById("itemTags").value = (item.tags || []).join(", ");
  document.getElementById("itemModal").style.display = "flex";
}

function closeItemModal() {
  document.getElementById("itemModal").style.display = "none";
}

function saveMenuItem() {
  const name     = document.getElementById("itemName").value.trim();
  const category = document.getElementById("itemCategory").value.trim();
  const price    = parseFloat(document.getElementById("itemPrice").value);
  const desc     = document.getElementById("itemDesc").value.trim();
  const emoji    = document.getElementById("itemEmoji").value.trim();
  const tags     = document.getElementById("itemTags").value.split(",").map(t => t.trim()).filter(Boolean);

  if (!name || !category || isNaN(price)) {
    alert("Please fill in Name, Category and Price.");
    return;
  }

  const menu = getOwnerMenu();

  if (editingItemId) {
    // Edit existing
    menu.forEach(cat => {
      const item = cat.items.find(i => i.id === editingItemId);
      if (item) {
        Object.assign(item, { name, price, desc, emoji, tags });
        // Move category if needed
        if (cat.category !== category) {
          cat.items = cat.items.filter(i => i.id !== editingItemId);
          let targetCat = menu.find(c => c.category === category);
          if (!targetCat) { targetCat = { category, items: [] }; menu.push(targetCat); }
          targetCat.items.push(item);
        }
      }
    });
  } else {
    // Add new
    const newItem = { id: Date.now(), name, price, desc, emoji, tags, popular: false };
    let targetCat = menu.find(c => c.category === category);
    if (!targetCat) { targetCat = { category, items: [] }; menu.push(targetCat); }
    targetCat.items.push(newItem);
  }

  saveOwnerMenu(menu);
  closeItemModal();
  loadMenuTable();
}

function deleteMenuItem(itemId) {
  if (!confirm("Delete this menu item?")) return;
  const menu = getOwnerMenu();
  menu.forEach(cat => { cat.items = cat.items.filter(i => i.id !== itemId); });
  saveOwnerMenu(menu.filter(c => c.items.length > 0));
  loadMenuTable();
}

// ===== REVIEWS =====

function loadOwnerReviews() {
  const reviews = getOwnerReviews();
  const avg = reviews.length ? (reviews.reduce((s,r) => s+r.rating,0)/reviews.length).toFixed(1) : "N/A";
  document.getElementById("ownerBigRating").innerHTML = `<div style="font-size:2.5rem;font-weight:900;">${avg} <span style="color:var(--accent);font-size:2rem;">★</span></div><p>${reviews.length} reviews</p>`;

  document.getElementById("ownerReviewsList").innerHTML = reviews.map(r => `
    <div class="owner-review-card">
      <div style="display:flex;justify-content:space-between;margin-bottom:6px;">
        <strong>${r.user}</strong><span style="color:var(--text-light);font-size:0.82rem;">${r.date}</span>
      </div>
      <div style="color:var(--accent);">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
      <p style="margin-top:8px;font-size:0.9rem;">${r.text}</p>
    </div>
  `).join("") || "<p style='color:var(--text-light);'>No reviews yet.</p>";
}

// ===== SETTINGS =====

function loadSettings() {
  document.getElementById("settingName").value     = ownerRestaurant.name;
  document.getElementById("settingCuisine").value  = ownerRestaurant.cuisine;
  document.getElementById("settingDelivery").value = parseInt(ownerRestaurant.deliveryTime);
  document.getElementById("settingDesc").value     = ownerRestaurant.description;
  document.getElementById("settingStatus").value   = ownerRestaurant.status;
}

function saveSettings() {
  ownerRestaurant.name        = document.getElementById("settingName").value.trim();
  ownerRestaurant.cuisine     = document.getElementById("settingCuisine").value.trim();
  ownerRestaurant.deliveryTime = document.getElementById("settingDelivery").value + " min";
  ownerRestaurant.description  = document.getElementById("settingDesc").value.trim();
  ownerRestaurant.status       = document.getElementById("settingStatus").value;
  document.getElementById("ownerName").textContent = ownerRestaurant.name;
  alert("Settings saved!");
}

// ===== NAVIGATION =====

function showSection(name) {
  document.querySelectorAll(".dash-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(n => n.classList.remove("active"));
  document.getElementById(`section-${name}`)?.classList.add("active");
  event.currentTarget.classList.add("active");
  document.getElementById("sectionTitle").textContent = name.charAt(0).toUpperCase() + name.slice(1);
}

function toggleSidebar() {
  document.getElementById("sidebar")?.classList.toggle("open");
}

function formatStatus(s) {
  return s.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

document.addEventListener("DOMContentLoaded", initDashboard);
