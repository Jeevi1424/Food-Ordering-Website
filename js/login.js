// ===== LOGIN / REGISTER PAGE =====

function switchTab(tab) {
  document.getElementById("loginForm").style.display    = tab === "login"    ? "block" : "none";
  document.getElementById("registerForm").style.display = tab === "register" ? "block" : "none";
  document.getElementById("loginTab").classList.toggle("active",    tab === "login");
  document.getElementById("registerTab").classList.toggle("active", tab === "register");
}

function handleLogin(e) {
  e.preventDefault();
  const email    = document.getElementById("loginEmail").value.trim();
  const password = document.getElementById("loginPassword").value;
  const errEl    = document.getElementById("loginError");

  const user = MOCK_USERS.find(u => u.email === email && u.password === password);
  if (!user) {
    errEl.textContent = "Invalid email or password.";
    return;
  }
  errEl.textContent = "";
  setCurrentUser(user);

  // Redirect based on role
  if (user.role === "admin") {
    window.location.href = "admin.html";
  } else if (user.role === "owner") {
    window.location.href = "owner-dashboard.html";
  } else {
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    window.location.href = returnTo || "index.html";
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name     = document.getElementById("regName").value.trim();
  const email    = document.getElementById("regEmail").value.trim();
  const phone    = document.getElementById("regPhone").value.trim();
  const password = document.getElementById("regPassword").value;
  const role     = document.getElementById("regRole").value;
  const errEl    = document.getElementById("registerError");

  if (password.length < 6) {
    errEl.textContent = "Password must be at least 6 characters.";
    return;
  }

  const exists = MOCK_USERS.find(u => u.email === email);
  if (exists) {
    errEl.textContent = "An account with this email already exists.";
    return;
  }

  const newUser = {
    id: Date.now(),
    name,
    email,
    phone,
    password,
    role,
    joined: new Date().toISOString().split("T")[0],
    orders: 0
  };

  // Add to mock (session only — not persisted)
  MOCK_USERS.push(newUser);
  errEl.textContent = "";
  setCurrentUser(newUser);
  alert(`Welcome, ${name}! Your account has been created.`);

  if (role === "owner") {
    window.location.href = "owner-dashboard.html";
  } else {
    window.location.href = "index.html";
  }
}

function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  input.type = input.type === "password" ? "text" : "password";
}

function setDemoOwner() {
  const owner = MOCK_USERS.find(u => u.role === "owner");
  if (owner) setCurrentUser(owner);
}

function setDemoAdmin() {
  const admin = MOCK_USERS.find(u => u.role === "admin");
  if (admin) setCurrentUser(admin);
}

// Check if already logged in
document.addEventListener("DOMContentLoaded", () => {
  const user = getCurrentUser();
  if (user) {
    if (user.role === "admin") window.location.href = "admin.html";
    else if (user.role === "owner") window.location.href = "owner-dashboard.html";
    else window.location.href = "index.html";
  }

  // Check URL params for tab
  const params = new URLSearchParams(window.location.search);
  if (params.get("tab") === "register") switchTab("register");
});
