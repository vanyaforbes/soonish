// data.js - temporary data for the server. It lives in memory, so it resets when the server restarts.

const DAY_MS = 24 * 60 * 60 * 1000;

// Date as "YYYY-MM-DD" in local time, the same format as <input type="date">.
function dateFromToday(days) {
  const date = new Date(Date.now() + days * DAY_MS);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

let nextId = 1;

// Every new food item gets the next number, so ids never repeat.
function createId() {
  const id = nextId;
  nextId = nextId + 1;
  return id;
}

const food = [
  { id: createId(), name: "Plov from Sunday", category: "Leftovers", owner: "Aidar", shelf: 2, expiryDate: dateFromToday(1), portions: 3, shared: true },
  { id: createId(), name: "Kefir", category: "Dairy", owner: "Dana", shelf: 1, expiryDate: dateFromToday(0), portions: 2, shared: false },
  { id: createId(), name: "Tomatoes", category: "Vegetables", owner: "Madina", shelf: 4, expiryDate: dateFromToday(5), portions: 4, shared: false },
  { id: createId(), name: "Chicken soup", category: "Leftovers", owner: "Timur", shelf: 2, expiryDate: dateFromToday(-1), portions: 1, shared: false },
  { id: createId(), name: "Eggs", category: "Dairy", owner: "Kamila", shelf: 3, expiryDate: dateFromToday(14), portions: 6, shared: false }
];

module.exports = { food, createId };
