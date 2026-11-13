// validators.js - checks the data that the frontend sends to the server.

const CATEGORIES = ["Leftovers", "Dairy", "Vegetables", "Fruit", "Meat", "Other"];

// Returns an object with errors. An empty object means the data is fine.
function validateFood(data) {
  const errors = {};
  const name = typeof data.name === "string" ? data.name.trim() : "";
  const owner = typeof data.owner === "string" ? data.owner.trim() : "";

  if (name.length < 2) {
    errors.name = "Write what the food is.";
  }
  if (!CATEGORIES.includes(data.category)) {
    errors.category = "Choose a category.";
  }
  if (owner.length < 2) {
    errors.owner = "Whose food is it?";
  }
  if (!Number.isInteger(data.shelf) || data.shelf < 1 || data.shelf > 5) {
    errors.shelf = "Shelf 1 to 5.";
  }
  if (!Number.isInteger(data.portions) || data.portions < 1 || data.portions > 50) {
    errors.portions = "1 to 50 portions.";
  }
  if (typeof data.expiryDate !== "string" || data.expiryDate === "") {
    errors.expiryDate = "Choose a date.";
  }
  return errors;
}

module.exports = { validateFood };
