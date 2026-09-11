// ===== AUTH MANAGEMENT =====

function getCurrentUser() {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
}

function setCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function updateAuthLink() {
  const user = getCurrentUser();
  const link = document.getElementById("authLink");
  if (!link) return;

  if (user) {
    link.textContent = user.name.split(" ")[0];
    link.href = "#";
    link.onclick = function(e) {
      e.preventDefault();
      if (confirm(`Logout ${user.name}?`)) logoutUser();
    };
  } else {
    link.textContent = "Login";
    link.href = "login.html";
    link.onclick = null;
  }
}

document.addEventListener("DOMContentLoaded", updateAuthLink);
