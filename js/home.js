// ===== HOME PAGE =====

function renderFeatured() {
  const grid = document.getElementById("featuredGrid");
  if (!grid) return;
  const featured = RESTAURANTS.filter(r => r.featured);
  grid.innerHTML = featured.map(r => restaurantCard(r)).join("");
}

function restaurantCard(r) {
  return `
    <div class="restaurant-card" onclick="location.href='menu.html?id=${r.id}'">
      <div class="rest-img">${r.emoji}</div>
      <div class="rest-body">
        <div class="rest-name">${r.name}</div>
        <div class="rest-meta">
          <span class="star-rating"><i class="fas fa-star"></i> ${r.rating}</span>
          <span><i class="fas fa-clock"></i> ${r.deliveryTime}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${r.location}</span>
        </div>
        <div class="rest-footer">
          <span class="rest-tag">${r.cuisine}</span>
          <span class="${r.status === 'open' ? 'rest-status-open' : 'rest-status-closed'}">
            ${r.status === 'open' ? '● Open' : '● Closed'}
          </span>
        </div>
      </div>
    </div>
  `;
}

function goToRestaurants(cuisine) {
  window.location.href = `restaurants.html?cuisine=${encodeURIComponent(cuisine)}`;
}

function handleHeroSearch() {
  const query = document.getElementById("heroSearch")?.value.trim();
  const location = document.getElementById("locationInput")?.value.trim();
  let url = "restaurants.html";
  const params = new URLSearchParams();
  if (query) params.set("search", query);
  if (location) params.set("location", location);
  if (params.toString()) url += "?" + params.toString();
  window.location.href = url;
}

document.addEventListener("DOMContentLoaded", () => {
  renderFeatured();

  // Allow Enter key in hero search
  document.getElementById("heroSearch")?.addEventListener("keydown", e => {
    if (e.key === "Enter") handleHeroSearch();
  });
  document.getElementById("locationInput")?.addEventListener("keydown", e => {
    if (e.key === "Enter") handleHeroSearch();
  });
});
