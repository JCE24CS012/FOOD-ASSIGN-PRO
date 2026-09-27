const restaurants = [
  { id: "delhi", name: "Dilli Darbar", cuisine: "North Indian classics", rating: "4.9", time: "25-35 min", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=160&q=80" },
  { id: "madras", name: "Madras Meals", cuisine: "South Indian kitchen", rating: "4.8", time: "20-30 min", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=160&q=80" },
  { id: "bombay", name: "Bombay Tiffin", cuisine: "Mumbai street food", rating: "4.7", time: "20-30 min", image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=160&q=80" },
];

const dishes = [
  { id: "biryani", restaurant: "delhi", name: "Hyderabadi chicken biryani", category: "Biryani", price: 289, rating: "4.9", description: "Dum-cooked basmati, warming spices & mint raita.", badge: "House bestseller", image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=700&q=80" },
  { id: "paneer", restaurant: "delhi", name: "Paneer tikka masala", category: "North Indian", price: 249, rating: "4.8", description: "Charred paneer in a rich tomato makhani gravy.", badge: "Vegetarian favorite", image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=700&q=80" },
  { id: "dal", restaurant: "delhi", name: "Dal makhani & jeera rice", category: "North Indian", price: 219, rating: "4.9", description: "Slow-simmered black lentils, finished with cream.", badge: "Slow cooked", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=700&q=80" },
  { id: "dosa", restaurant: "madras", name: "Mysore masala dosa", category: "South Indian", price: 169, rating: "4.8", description: "Crisp rice crepe, spiced potato & coconut chutney.", badge: "Crisp & golden", image: "https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80" },
  { id: "idli", restaurant: "madras", name: "Idli sambar breakfast", category: "South Indian", price: 129, rating: "4.7", description: "Soft steamed idlis with homestyle sambar.", badge: "Comfort classic", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=700&q=80" },
  { id: "vada", restaurant: "madras", name: "Medu vada & chutney", category: "South Indian", price: 119, rating: "4.8", description: "Golden lentil doughnuts, crisp outside and soft inside.", badge: "Made fresh", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=700&q=80" },
  { id: "vadapav", restaurant: "bombay", name: "Mumbai vada pav", category: "Street Food", price: 89, rating: "4.9", description: "Spiced potato fritter, soft pav & punchy chutneys.", badge: "Mumbai original", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?auto=format&fit=crop&w=700&q=80" },
  { id: "pavbhaji", restaurant: "bombay", name: "Pav bhaji", category: "Street Food", price: 159, rating: "4.8", description: "Buttery mashed vegetables, toasted pav & lime.", badge: "Street-side favorite", image: "https://images.unsplash.com/photo-1601050690117-94f5f6fa8bd7?auto=format&fit=crop&w=700&q=80" },
  { id: "gulabjamun", restaurant: "bombay", name: "Gulab jamun (2 pcs)", category: "Desserts", price: 79, rating: "4.7", description: "Warm milk-solid dumplings in cardamom syrup.", badge: "A sweet finish", image: "https://images.unsplash.com/photo-1666190094764-f5e08b1d1d68?auto=format&fit=crop&w=700&q=80" },
];

const DELIVERY_FEE = 39;
const storage = {
  read(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
    catch { return fallback; }
  },
  write(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* The app remains usable when browser storage is unavailable. */ }
  },
};

const state = {
  restaurant: "delhi",
  category: "All",
  query: "",
  sort: "popular",
  cart: storage.read("tiffin-club-cart", {}),
  user: storage.read("goodfood-user", null),
};

const elements = {
  restaurantList: document.querySelector("#restaurantList"),
  categoryList: document.querySelector("#categoryList"),
  foodGrid: document.querySelector("#foodGrid"),
  emptyState: document.querySelector("#emptyState"),
  foodSearch: document.querySelector("#foodSearch"),
  sortSelect: document.querySelector("#sortSelect"),
  menuTitle: document.querySelector("#menuTitle"),
  menuSubtitle: document.querySelector("#menuSubtitle"),
  cartItems: document.querySelector("#cartItems"),
  cartEmpty: document.querySelector("#cartEmpty"),
  cartBottom: document.querySelector("#cartBottom"),
  cartCount: document.querySelector("#cartCount"),
  cartTotal: document.querySelector("#cartTotal"),
  loginDialog: document.querySelector("#loginDialog"),
  loginForm: document.querySelector("#loginForm"),
  loginError: document.querySelector("#loginError"),
  emailInput: document.querySelector("#emailInput"),
  passwordInput: document.querySelector("#passwordInput"),
  loginButton: document.querySelector("#loginButton"),
  userGreeting: document.querySelector("#userGreeting"),
  confirmation: document.querySelector("#confirmation"),
  confirmationDetails: document.querySelector("#confirmationDetails"),
  toast: document.querySelector("#toast"),
};

const money = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
}).format;

function renderRestaurants() {
  elements.restaurantList.innerHTML = restaurants.map((restaurant) => `
    <button class="restaurant-card" type="button" data-restaurant="${restaurant.id}" aria-pressed="${state.restaurant === restaurant.id}">
      <img class="restaurant-thumb" src="${restaurant.image}" alt="" loading="lazy" />
      <span class="restaurant-meta"><strong>${restaurant.name}</strong><span><span class="rating-star">&#9733;</span> ${restaurant.rating} &middot; ${restaurant.time}</span></span>
    </button>`).join("");
}

function getVisibleDishes() {
  const query = state.query.trim().toLowerCase();
  const visible = dishes.filter((dish) => {
    const restaurant = restaurants.find((item) => item.id === dish.restaurant);
    const matchesRestaurant = !state.restaurant || dish.restaurant === state.restaurant;
    const matchesCategory = state.category === "All" || dish.category === state.category;
    const matchesQuery = !query || `${dish.name} ${dish.category} ${dish.description} ${restaurant.name}`.toLowerCase().includes(query);
    return matchesRestaurant && matchesCategory && matchesQuery;
  });

  if (state.sort === "price-low") visible.sort((first, second) => first.price - second.price);
  if (state.sort === "price-high") visible.sort((first, second) => second.price - first.price);
  return visible;
}

function renderCategories(visibleDishes) {
  const categories = ["All", ...new Set(visibleDishes.map((dish) => dish.category))];
  if (!categories.includes(state.category)) state.category = "All";
  elements.categoryList.innerHTML = categories.map((category) => `
    <button class="category-chip" type="button" data-category="${category}" aria-pressed="${state.category === category}">${category}</button>`).join("");
}

function renderMenu() {
  const restaurant = restaurants.find((item) => item.id === state.restaurant);
  elements.menuTitle.textContent = state.query ? "Search results" : restaurant ? `From ${restaurant.name}` : "Popular near you";
  elements.menuSubtitle.textContent = state.query ? "Matching dishes and restaurants" : restaurant ? `${restaurant.cuisine} · ${restaurant.time}` : "Fresh picks from local kitchens";
  const visibleDishes = getVisibleDishes();
  renderCategories(visibleDishes);
  elements.foodGrid.innerHTML = visibleDishes.map((dish, index) => `
    <article class="food-card" style="animation-delay:${Math.min(index * 45, 180)}ms">
      <div class="food-image-wrap"><img class="food-image" src="${dish.image}" alt="${dish.name}" loading="lazy" /><span class="food-badge">${dish.badge}</span></div>
      <div class="food-details">
        <div class="food-title-row"><h4>${dish.name}</h4><span class="food-price">${money(dish.price)}</span></div>
        <p class="food-description">${dish.description}</p>
        <div class="food-bottom"><span class="food-rating"><span class="rating-star">&#9733;</span> ${dish.rating}</span><button class="add-button" type="button" data-add="${dish.id}" aria-label="Add ${dish.name} to your bag"><span aria-hidden="true">+</span> Add</button></div>
      </div>
    </article>`).join("");
  elements.emptyState.hidden = visibleDishes.length > 0;
  elements.foodGrid.hidden = visibleDishes.length === 0;
}

function renderCart() {
  const entries = Object.entries(state.cart).filter(([, quantity]) => quantity > 0);
  const itemCount = entries.reduce((total, [, quantity]) => total + quantity, 0);
  const subtotal = entries.reduce((total, [id, quantity]) => total + dishes.find((dish) => dish.id === id).price * quantity, 0);
  elements.cartCount.textContent = itemCount;
  elements.cartEmpty.hidden = itemCount > 0;
  elements.cartBottom.hidden = itemCount === 0;
  elements.cartItems.innerHTML = entries.map(([id, quantity]) => {
    const dish = dishes.find((item) => item.id === id);
    return `<div class="cart-item">
      <span class="cart-item-name" title="${dish.name}">${dish.name}</span><span class="cart-item-price">${money(dish.price * quantity)}</span>
      <div class="quantity-controls" aria-label="Quantity for ${dish.name}"><button type="button" data-quantity="${id}" data-change="-1" aria-label="Remove one ${dish.name}">-</button><span>${quantity}</span><button type="button" data-quantity="${id}" data-change="1" aria-label="Add one ${dish.name}">+</button></div>
      <button class="remove-button" type="button" data-remove="${id}">Remove</button>
    </div>`;
  }).join("");
  elements.cartTotal.textContent = money(subtotal + (itemCount ? DELIVERY_FEE : 0));
  storage.write("tiffin-club-cart", state.cart);
}

function renderUser() {
  if (state.user) {
    const name = state.user.email.split("@")[0];
    elements.userGreeting.textContent = `Hi, ${name}`;
    elements.userGreeting.hidden = false;
    elements.loginButton.textContent = "Log out";
  } else {
    elements.userGreeting.hidden = true;
    elements.loginButton.textContent = "Log in";
  }
}

function render() {
  renderRestaurants();
  renderMenu();
  renderCart();
  renderUser();
}

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => elements.toast.classList.remove("is-visible"), 2200);
}

function addToCart(id) {
  state.cart[id] = (state.cart[id] || 0) + 1;
  renderCart();
  showToast(`${dishes.find((dish) => dish.id === id).name} added to your bag`);
}

function changeQuantity(id, change) {
  state.cart[id] = (state.cart[id] || 0) + change;
  if (state.cart[id] <= 0) delete state.cart[id];
  renderCart();
}

function openLogin() {
  elements.loginError.textContent = "";
  elements.loginDialog.showModal();
  window.setTimeout(() => elements.emailInput.focus(), 50);
}

function placeOrder() {
  const itemCount = Object.values(state.cart).reduce((total, quantity) => total + quantity, 0);
  if (!itemCount) return;
  if (!state.user) {
    openLogin();
    return;
  }
  const subtotal = Object.entries(state.cart).reduce((total, [id, quantity]) => total + dishes.find((dish) => dish.id === id).price * quantity, 0);
  const orderId = `GF-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
  elements.confirmationDetails.textContent = `Order ${orderId} · ${itemCount} item${itemCount === 1 ? "" : "s"} · ${money(subtotal + DELIVERY_FEE)} including delivery.`;
  elements.confirmation.hidden = false;
  state.cart = {};
  renderCart();
  elements.confirmation.scrollIntoView({ behavior: "smooth", block: "center" });
}

elements.restaurantList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-restaurant]");
  if (!button) return;
  state.restaurant = button.dataset.restaurant;
  state.category = "All";
  render();
});

elements.categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  state.category = button.dataset.category;
  renderMenu();
});

elements.foodGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

elements.cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) changeQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
  if (removeButton) {
    delete state.cart[removeButton.dataset.remove];
    renderCart();
  }
});

elements.foodSearch.addEventListener("input", () => {
  state.query = elements.foodSearch.value;
  state.restaurant = "";
  state.category = "All";
  renderRestaurants();
  renderMenu();
});

elements.sortSelect.addEventListener("change", () => {
  state.sort = elements.sortSelect.value;
  renderMenu();
});

elements.loginButton.addEventListener("click", () => {
  if (state.user) {
    state.user = null;
    storage.write("goodfood-user", null);
    renderUser();
    showToast("You are logged out");
  } else openLogin();
});

document.querySelector("#closeLogin").addEventListener("click", () => elements.loginDialog.close());
elements.loginDialog.addEventListener("click", (event) => {
  if (event.target === elements.loginDialog) elements.loginDialog.close();
});

elements.loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const email = elements.emailInput.value.trim();
  const password = elements.passwordInput.value;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    elements.loginError.textContent = "Enter a valid email address.";
    elements.emailInput.focus();
    return;
  }
  if (password.length < 4) {
    elements.loginError.textContent = "Password must be at least 4 characters.";
    elements.passwordInput.focus();
    return;
  }
  state.user = { email };
  storage.write("goodfood-user", state.user);
  renderUser();
  elements.loginDialog.close();
  elements.loginForm.reset();
  showToast("You are logged in. Your order is ready when you are.");
});

document.querySelector("#checkoutButton").addEventListener("click", placeOrder);
document.querySelector("#dismissConfirmation").addEventListener("click", () => { elements.confirmation.hidden = true; });

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    elements.foodSearch.focus();
  }
});

render();