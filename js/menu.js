// ===== MENU PAGE =====

let currentRestaurant = null;
let selectedRating = 0;
let allMenuItems = [];

function loadRestaurant() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const restaurant = getRestaurantById(id);

  if (!restaurant) {
    document.body.innerHTML = "<p style='text-align:center;padding:60px;font-size:1.2rem;'>Restaurant not found. <a href='restaurants.html'>Go back</a></p>";
    return;
  }

  currentRestaurant = restaurant;
  document.title = `${restaurant.name} - FoodRush`;

  // Fill hero
  document.getElementById("restaurantName").textContent = restaurant.name;
  document.getElementById("restaurantCuisine").textContent = restaurant.cuisine;
  document.getElementById("restaurantRating").textContent = `${restaurant.rating} ★`;
  document.getElementById("restaurantDelivery").textContent = restaurant.deliveryTime;
  document.getElementById("restaurantLocation").textContent = restaurant.location;
  document.getElementById("restaurantDesc").textContent = restaurant.description;
  document.getElementById("restaurantEmoji").textContent = restaurant.emoji;

  // Build flat item list
  allMenuItems = restaurant.menu.flatMap(cat => cat.items.map(item => ({ ...item, categoryName: cat.category })));

  // Sidebar categories
  const catList = document.getElementById("categoryList");
  catList.innerHTML = restaurant.menu.map((cat, idx) => `
    <li class="${idx === 0 ? 'active' : ''}" onclick="scrollToCategory('${cat.category}', this)">
      ${cat.category}
    </li>
  `).join("");

  // Build menu
  renderMenuItems(restaurant.menu);

  // Reviews
  renderReviews();
  renderReviewSnippet();
}

function renderMenuItems(menuData) {
  const container = document.getElementById("menuItemsContainer");
  container.innerHTML = menuData.map(cat => `
    <div class="menu-category-section" id="cat-${cat.category.replace(/\s+/g,'-')}">
      <h2 class="menu-category-title">${cat.category}</h2>
      <div class="menu-items-grid">
        ${cat.items.map(item => menuItemCard(item)).join("")}
      </div>
    </div>
  `).join("");
}

function menuItemCard(item) {
  const tags = item.tags ? item.tags.map(t => `<span class="item-tag ${t}">${t}</span>`).join("") : "";
  return `
    <div class="menu-item" id="item-${item.id}">
      <div class="menu-item-emoji">${item.emoji || "🍽"}</div>
      <div class="menu-item-info">
        <div class="menu-item-name">${item.name} ${item.popular ? '<span style="color:var(--accent);font-size:0.75rem;">★ Popular</span>' : ""}</div>
        <div class="menu-item-desc">${item.desc || ""}</div>
        ${tags ? `<div class="menu-item-tags">${tags}</div>` : ""}
      </div>
      <div class="menu-item-right">
        <div class="menu-item-price">$${item.price.toFixed(2)}</div>
        <div id="ctrl-${item.id}">
          <button class="add-to-cart-btn" onclick="handleAddToCart(${item.id})">
            <i class="fas fa-plus"></i> Add
          </button>
        </div>
      </div>
    </div>
  `;
}

function handleAddToCart(itemId) {
  const item = allMenuItems.find(i => i.id === itemId);
  if (!item || !currentRestaurant) return;
  addToCart(item, currentRestaurant.id, currentRestaurant.name);
  updateItemControl(item);
}

function updateItemControl(item) {
  const cartItem = cart.items.find(i => i.id === item.id);
  const ctrl = document.getElementById(`ctrl-${item.id}`);
  if (!ctrl) return;
  if (cartItem) {
    ctrl.innerHTML = `
      <div class="item-qty-control">
        <button class="qty-btn" onclick="updateQty(${item.id}, -1); refreshItemControl(${item.id})"><i class="fas fa-minus"></i></button>
        <span class="qty-num">${cartItem.qty}</span>
        <button class="qty-btn" onclick="updateQty(${item.id}, 1); refreshItemControl(${item.id})"><i class="fas fa-plus"></i></button>
      </div>
    `;
  } else {
    ctrl.innerHTML = `<button class="add-to-cart-btn" onclick="handleAddToCart(${item.id})"><i class="fas fa-plus"></i> Add</button>`;
  }
}

function refreshItemControl(itemId) {
  const item = allMenuItems.find(i => i.id === itemId);
  if (item) updateItemControl(item);
}

function filterMenuItems() {
  const query = document.getElementById("menuSearch")?.value.toLowerCase() || "";
  if (!query) {
    renderMenuItems(currentRestaurant.menu);
    return;
  }
  const filtered = currentRestaurant.menu.map(cat => ({
    ...cat,
    items: cat.items.filter(item => item.name.toLowerCase().includes(query) || (item.desc && item.desc.toLowerCase().includes(query)))
  })).filter(cat => cat.items.length > 0);
  renderMenuItems(filtered);
}

function scrollToCategory(category, el) {
  document.querySelectorAll(".category-list li").forEach(li => li.classList.remove("active"));
  el.classList.add("active");
  const section = document.getElementById(`cat-${category.replace(/\s+/g,'-')}`);
  if (section) section.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ===== REVIEWS =====

function renderReviews() {
  if (!currentRestaurant) return;
  const reviews = getReviews();
  const list = document.getElementById("reviewsList");
  const bigRating = document.getElementById("bigRating");
  const bars = document.getElementById("ratingBars");

  if (!reviews.length) {
    list.innerHTML = "<p style='color:var(--text-light);'>No reviews yet. Be the first!</p>";
    return;
  }

  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  if (bigRating) {
    bigRating.innerHTML = `${avg} <i class="fas fa-star" style="color:var(--accent);font-size:1.5rem;"></i><span>${reviews.length} reviews</span>`;
  }

  // Bars
  if (bars) {
    bars.innerHTML = [5,4,3,2,1].map(star => {
      const count = reviews.filter(r => r.rating === star).length;
      const pct = Math.round((count / reviews.length) * 100);
      return `
        <div class="rating-bar-row">
          <span>${star}</span>
          <i class="fas fa-star" style="color:var(--accent);font-size:0.75rem;"></i>
          <div class="rating-bar-bg"><div class="rating-bar-fill" style="width:${pct}%"></div></div>
          <span style="min-width:24px;font-size:0.78rem;color:var(--text-light);">${count}</span>
        </div>
      `;
    }).join("");
  }

  list.innerHTML = reviews.map(r => `
    <div class="review-card">
      <div class="review-header">
        <span class="reviewer-name">${r.user}</span>
        <span class="review-date">${r.date}</span>
      </div>
      <div class="review-stars">${"★".repeat(r.rating)}${"☆".repeat(5-r.rating)}</div>
      <p class="review-text">${r.text}</p>
    </div>
  `).join("");
}

function renderReviewSnippet() {
  const reviews = getReviews();
  const snippet = document.getElementById("reviewSnippet");
  if (!snippet || !reviews.length) return;
  const avg = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);
  snippet.innerHTML = `<div style="font-size:1.4rem;font-weight:800;color:var(--secondary);">${avg} <span style="color:var(--accent);">★</span></div><div style="font-size:0.82rem;color:var(--text-light);">${reviews.length} reviews</div>`;
}

function getReviews() {
  const stored = localStorage.getItem(`reviews_${currentRestaurant.id}`);
  const extra = stored ? JSON.parse(stored) : [];
  return [...currentRestaurant.reviews, ...extra];
}

function submitReview() {
  const user = getCurrentUser();
  if (!user) {
    alert("Please login to leave a review.");
    window.location.href = "login.html";
    return;
  }
  if (selectedRating === 0) {
    alert("Please select a star rating.");
    return;
  }
  const text = document.getElementById("reviewText")?.value.trim();
  if (!text) {
    alert("Please write your review.");
    return;
  }

  const newReview = {
    id: Date.now(),
    user: user.name,
    rating: selectedRating,
    text,
    date: new Date().toISOString().split("T")[0]
  };

  const key = `reviews_${currentRestaurant.id}`;
  const stored = localStorage.getItem(key);
  const reviews = stored ? JSON.parse(stored) : [];
  reviews.push(newReview);
  localStorage.setItem(key, JSON.stringify(reviews));

  document.getElementById("reviewText").value = "";
  selectedRating = 0;
  document.querySelectorAll(".star-select i").forEach(s => s.classList.remove("selected"));
  renderReviews();
  alert("Review submitted! Thank you.");
}

// Star select
document.addEventListener("DOMContentLoaded", () => {
  loadRestaurant();

  const stars = document.querySelectorAll(".star-select i");
  stars.forEach(star => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.val);
      stars.forEach(s => {
        s.classList.toggle("selected", parseInt(s.dataset.val) <= selectedRating);
      });
    });
  });
});
