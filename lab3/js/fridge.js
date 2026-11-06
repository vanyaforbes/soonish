// fridge.js - CRUD module for the shared fridge. All data lives in one array of objects.

const SOON_DAYS = 2;
const DAY_MS = 24 * 60 * 60 * 1000;

let items = [];
let editingId = null;

const itemForm = document.querySelector("#item-form");
const itemGrid = document.querySelector("#item-grid");
const formTitle = document.querySelector("#form-title");
const submitButton = document.querySelector("#submit-button");
const cancelButton = document.querySelector("#cancel-button");
const fridgeMessage = document.querySelector("#fridge-message");
const searchInput = document.querySelector("#search");
const stateFilter = document.querySelector("#state-filter");
const categoryFilter = document.querySelector("#category-filter");
const sortSelect = document.querySelector("#sort");

function toDateText(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

function dateFromToday(days) {
  return toDateText(new Date(Date.now() + days * DAY_MS));
}

function createId() {
  return "item-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

function createSampleItems() {
  return [
    { id: createId(), name: "Plov from Sunday", category: "Leftovers", owner: "Aidar", shelf: 2, expiryDate: dateFromToday(1), portions: 3, shared: true },
    { id: createId(), name: "Kefir", category: "Dairy", owner: "Dana", shelf: 1, expiryDate: dateFromToday(0), portions: 2, shared: false },
    { id: createId(), name: "Tomatoes", category: "Vegetables", owner: "Madina", shelf: 4, expiryDate: dateFromToday(5), portions: 4, shared: false },
    { id: createId(), name: "Chicken soup", category: "Leftovers", owner: "Timur", shelf: 2, expiryDate: dateFromToday(-1), portions: 1, shared: false },
    { id: createId(), name: "Eggs", category: "Dairy", owner: "Kamila", shelf: 3, expiryDate: dateFromToday(14), portions: 6, shared: false }
  ];
}

function isValidItem(item) {
  return item !== null && typeof item === "object" && typeof item.id === "string" &&
    typeof item.name === "string" && typeof item.expiryDate === "string";
}

function loadItems() {
  const saved = readJSON(STORAGE_KEYS.items, null);
  if (!saved.ok || (!saved.missing && !Array.isArray(saved.value))) {
    showMessage("Saved data was damaged, so the list was reset.", "failure");
    items = [];
    saveItems();
    return;
  }
  if (saved.missing) {
    items = createSampleItems();
    saveItems();
    return;
  }
  items = saved.value.filter(isValidItem);
}

function saveItems() {
  if (!writeJSON(STORAGE_KEYS.items, items)) {
    showMessage("Changes could not be saved in this browser.", "failure");
  }
}

function showMessage(text, kind) {
  fridgeMessage.className = "form-message";
  fridgeMessage.textContent = text;
  if (kind) {
    fridgeMessage.classList.add(kind);
  }
}

function daysLeft(item) {
  const today = new Date(toDateText(new Date()));
  const expiry = new Date(item.expiryDate);
  return Math.round((expiry - today) / DAY_MS);
}

// Conditional UI state: the same object decides the badge and the card colour.
function getFreshness(item) {
  const days = daysLeft(item);
  if (days < 0) {
    return { state: "expired", label: "Expired" };
  } else if (days === 0) {
    return { state: "soon", label: "Eat today" };
  } else if (days <= SOON_DAYS) {
    return { state: "soon", label: days === 1 ? "1 day left" : days + " days left" };
  }
  return { state: "fresh", label: days + " days left" };
}

function readForm() {
  return {
    name: itemForm.elements.name.value.trim(),
    category: itemForm.elements.category.value,
    owner: itemForm.elements.owner.value.trim(),
    shelf: Number(itemForm.elements.shelf.value),
    expiryDate: itemForm.elements.expiryDate.value,
    portions: Number(itemForm.elements.portions.value),
    shared: itemForm.elements.shared.checked
  };
}

function validateItem(data) {
  const errors = {};
  if (data.name.length < 2) {
    errors.name = "Write what the food is.";
  }
  if (data.category === "") {
    errors.category = "Choose a category.";
  }
  if (data.owner.length < 2) {
    errors.owner = "Whose food is it?";
  }
  if (!Number.isInteger(data.shelf) || data.shelf < 1 || data.shelf > 5) {
    errors.shelf = "Shelf 1 to 5.";
  }
  if (data.expiryDate === "") {
    errors.expiryDate = "Choose a date.";
  } else if (editingId === null && daysLeft(data) < 0) {
    errors.expiryDate = "New food cannot be expired.";
  }
  if (!Number.isInteger(data.portions) || data.portions < 1 || data.portions > 50) {
    errors.portions = "1 to 50 portions.";
  }
  return errors;
}

function showFormErrors(errors) {
  for (const name of ["name", "category", "owner", "shelf", "expiryDate", "portions"]) {
    const text = errors[name] || "";
    document.querySelector("#" + name + "-error").textContent = text;
    itemForm.elements[name].classList.toggle("is-invalid", text !== "");
  }
}

// CREATE
function addItem(data) {
  items.push({ id: createId(), ...data });
  saveItems();
  showMessage("Added " + data.name + ".", "success");
}

// UPDATE
function updateItem(id, data) {
  items = items.map((item) => (item.id === id ? { ...item, ...data } : item));
  saveItems();
  showMessage("Updated " + data.name + ".", "success");
}

// DELETE
function deleteItem(id) {
  const item = items.find((entry) => entry.id === id);
  if (!item || !window.confirm("Remove " + item.name + " from the fridge?")) {
    return;
  }
  items = items.filter((entry) => entry.id !== id);
  if (editingId === id) {
    resetForm();
  }
  saveItems();
  showMessage("Removed " + item.name + ".", "success");
  renderItems();
}

function toggleShared(id) {
  const item = items.find((entry) => entry.id === id);
  updateItem(id, { name: item.name, shared: !item.shared });
  renderItems();
}

function editItem(id) {
  const item = items.find((entry) => entry.id === id);
  editingId = id;
  itemForm.elements.name.value = item.name;
  itemForm.elements.category.value = item.category;
  itemForm.elements.owner.value = item.owner;
  itemForm.elements.shelf.value = item.shelf;
  itemForm.elements.expiryDate.value = item.expiryDate;
  itemForm.elements.portions.value = item.portions;
  itemForm.elements.shared.checked = item.shared;
  formTitle.textContent = "Edit " + item.name;
  submitButton.textContent = "Save changes";
  cancelButton.hidden = false;
  showFormErrors({});
  itemForm.scrollIntoView({ behavior: "smooth", block: "start" });
  itemForm.elements.name.focus();
}

function resetForm() {
  editingId = null;
  itemForm.reset();
  showFormErrors({});
  formTitle.textContent = "Add food";
  submitButton.textContent = "Put in the fridge";
  cancelButton.hidden = true;
}

function getVisibleItems() {
  const query = searchInput.value.trim().toLowerCase();
  const stateChoice = stateFilter.value;
  const categoryChoice = categoryFilter.value;

  const visible = items.filter((item) => {
    const matchesText = item.name.toLowerCase().includes(query) || item.owner.toLowerCase().includes(query);
    const matchesCategory = categoryChoice === "all" || item.category === categoryChoice;
    let matchesState = true;
    if (stateChoice === "shared") {
      matchesState = item.shared && getFreshness(item).state !== "expired";
    } else if (stateChoice !== "all") {
      matchesState = getFreshness(item).state === stateChoice;
    }
    return matchesText && matchesCategory && matchesState;
  });

  if (sortSelect.value === "name") {
    visible.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortSelect.value === "portions") {
    visible.sort((a, b) => b.portions - a.portions);
  } else {
    visible.sort((a, b) => daysLeft(a) - daysLeft(b));
  }
  return visible;
}

function createBadge(text, className) {
  const badge = document.createElement("span");
  badge.className = "badge " + className;
  badge.textContent = text;
  return badge;
}

function createIconButton(action, iconFile, label, id) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "icon-btn";
  button.dataset.action = action;
  button.dataset.id = id;
  button.setAttribute("aria-label", label);
  const icon = document.createElement("img");
  icon.src = "images/icons/" + iconFile;
  icon.alt = "";
  button.append(icon);
  return button;
}

function createCard(item) {
  const freshness = getFreshness(item);
  const card = document.createElement("article");
  card.className = "item-card state-" + freshness.state;
  card.classList.toggle("is-shared", item.shared);

  const badges = document.createElement("div");
  badges.className = "badge-row";
  badges.append(createBadge(freshness.label, "badge-" + freshness.state));
  if (item.shared && freshness.state !== "expired") {
    badges.append(createBadge("Up for grabs", "badge-shared"));
  }

  const title = document.createElement("h3");
  title.textContent = item.name;

  const meta = document.createElement("p");
  meta.className = "item-meta";
  meta.textContent = item.category + " · " + item.owner + " · shelf " + item.shelf + " · " +
    item.portions + (item.portions === 1 ? " portion" : " portions");

  const actions = document.createElement("div");
  actions.className = "item-actions";
  // Expired food must not be offered to neighbours.
  if (freshness.state === "expired") {
    const note = document.createElement("span");
    note.className = "item-note";
    note.textContent = "Do not share";
    actions.append(note);
  } else {
    const shareButton = document.createElement("button");
    shareButton.type = "button";
    shareButton.className = "share-btn";
    shareButton.dataset.action = "share";
    shareButton.dataset.id = item.id;
    shareButton.textContent = item.shared ? "Keep it" : "Pass it on";
    actions.append(shareButton);
  }
  actions.append(
    createIconButton("edit", "pencil.svg", "Edit " + item.name, item.id),
    createIconButton("delete", "trash.svg", "Delete " + item.name, item.id)
  );

  card.append(badges, title, meta, actions);
  return card;
}

function renderStats() {
  let soonCount = 0;
  let sharedCount = 0;
  for (const item of items) {
    if (getFreshness(item).state === "soon") {
      soonCount++;
    }
    if (item.shared && getFreshness(item).state !== "expired") {
      sharedCount++;
    }
  }
  document.querySelector("#stat-total").textContent = items.length;
  document.querySelector("#stat-soon").textContent = soonCount;
  document.querySelector("#stat-shared").textContent = sharedCount;
}

// READ
function renderItems() {
  const visible = getVisibleItems();
  itemGrid.replaceChildren();
  renderStats();

  if (visible.length === 0) {
    const empty = document.createElement("p");
    empty.className = "empty-state";
    empty.textContent = items.length === 0
      ? "The fridge is empty. Add the first item with the form."
      : "Nothing matches this search or filter.";
    itemGrid.append(empty);
    return;
  }
  for (const item of visible) {
    itemGrid.append(createCard(item));
  }
}

function handleSubmit(event) {
  event.preventDefault();
  const data = readForm();
  const errors = validateItem(data);
  showFormErrors(errors);
  if (Object.keys(errors).length > 0) {
    showMessage("Please fix the form first.", "failure");
    return;
  }
  if (editingId === null) {
    addItem(data);
  } else {
    updateItem(editingId, data);
  }
  resetForm();
  renderItems();
}

function handleGridClick(event) {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }
  const { action, id } = button.dataset;
  if (action === "edit") {
    editItem(id);
  } else if (action === "delete") {
    deleteItem(id);
  } else if (action === "share") {
    toggleShared(id);
  }
}

itemForm.addEventListener("submit", handleSubmit);
cancelButton.addEventListener("click", resetForm);
itemGrid.addEventListener("click", handleGridClick);
for (const control of [searchInput, stateFilter, categoryFilter, sortSelect]) {
  control.addEventListener("input", renderItems);
}

loadItems();
renderItems();
