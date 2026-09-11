// ===== RESTAURANTS PAGE =====

let allRestaurants = [...RESTAURANTS];
let filteredRestaurants = [...RESTAURANTS];

function restaurantCard(r) {
  return `
    <div class="restaurant-card" onclick="location.href='menu.html?id=${r.id}'">
      <div class="rest-img">${r.emoji}</div>
      <div class="rest-body">
        <div class="rest-name">${r.name}</div>
        <div class="rest-meta">
          <span class="star-rating"><i class="fas fa-star"></i> ${r.rating} (${Array.isArray(r.reviews) ? r.reviews.length : r.reviews})</span>
          <span><i class="fas fa-clock"></i> ${r.deliveryTime}</span>
          <span><i class="fas fa-map-marker-alt"></i> ${r.location}</span>
        </div>
        <p style="font-size:0.83rem;color:var(--text-light);margin:6px 0;line-height:1.4;">${r.description.substring(0, 80)}...</p>
        <div class="rest-footer">
          <span class="rest-tag">${r.cuisine}</span>
          <div style="display:flex;gap:10px;align-items:center;">
            <span class="rest-price">${r.priceRange} • Min $${r.minOrder}</span>
            <span class="${r.status === 'open' ? 'rest-status-open' : 'rest-status-closed'}">
              ${r.status === 'open' ? '● Open' : '● Closed'}
            </span>
          </div>
        </div>
      </div>
    </div>
  `;
}

function applyFilters() {
  const search   = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const location = document.getElementById("locationFilter")?.value.toLowerCase() || "";
  const cuisine  = document.getElementById("cuisineFilter")?.value || "all";
  const rating   = parseFloat(document.getElementById("ratingFilter")?.value || "0");
  const sort     = document.getElementById("sortFilter")?.value || "default";

  filteredRestaurants = allRestaurants.filter(r => {
    const matchSearch   = r.name.toLowerCase().includes(search) || r.cuisine.toLowerCase().includes(search) || r.description.toLowerCase().includes(search);
    const matchLocation = location === "" || r.location.toLowerCase().includes(location) || r.address.toLowerCase().includes(location);
    const matchCuisine  = cuisine === "all" || r.cuisine === cuisine;
    const matchRating   = r.rating >= rating;
    return matchSearch && matchLocation && matchCuisine && matchRating;
  });

  // Sort
  if (sort === "rating") {
    filteredRestaurants.sort((a, b) => b.rating - a.rating);
  } else if (sort === "delivery") {
    filteredRestaurants.sort((a, b) => parseInt(a.deliveryTime) - parseInt(b.deliveryTime));
  } else if (sort === "price") {
    filteredRestaurants.sort((a, b) => a.minOrder - b.minOrder);
  }

  renderRestaurants();
}

function renderRestaurants() {
  const grid = document.getElementById("restaurantGrid");
  const count = document.getElementById("resultsCount");
  const noResults = document.getElementById("noResults");

  if (!grid) return;

  if (filteredRestaurants.length === 0) {
    grid.innerHTML = "";
    if (noResults) noResults.style.display = "block";
    if (count) count.textContent = "";
    return;
  }

  if (noResults) noResults.style.display = "none";
  if (count) count.textContent = `Showing ${filteredRestaurants.length} restaurant${filteredRestaurants.length !== 1 ? "s" : ""}`;
  grid.innerHTML = filteredRestaurants.map(r => restaurantCard(r)).join("");
}

function readURLParams() {
  const params = new URLSearchParams(window.location.search);
  const cuisine = params.get("cuisine");
  const search  = params.get("search");
  const location = params.get("location");

  if (cuisine) {
    const select = document.getElementById("cuisineFilter");
    if (select) select.value = cuisine;
  }
  if (search) {
    const input = document.getElementById("searchInput");
    if (input) input.value = search;
  }
  if (location) {
    const input = document.getElementById("locationFilter");
    if (input) input.value = location;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  readURLParams();
  applyFilters();
});
