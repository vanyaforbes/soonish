// recipes.js - external public API: TheMealDB (https://www.themealdb.com/api.php).
// The server asks TheMealDB for meals with one ingredient and sends React only the useful fields.

const API_KEY = process.env.MEALDB_API_KEY || "1"; // "1" is TheMealDB's free test key
const BASE_URL = "https://www.themealdb.com/api/json/v1/" + API_KEY;
const MAX_RECIPES = 6;

async function searchByIngredient(ingredient) {
  const url = BASE_URL + "/filter.php?i=" + encodeURIComponent(ingredient);
  const response = await fetch(url, { signal: AbortSignal.timeout(8000) });
  if (!response.ok) {
    throw new Error("TheMealDB answered " + response.status);
  }
  const data = await response.json();
  return data.meals || []; // TheMealDB sends null when nothing is found
}

// "Chicken soup" finds nothing as a whole, so we also try every word: "chicken", "soup".
function getSearchWords(text) {
  const clean = text.trim().toLowerCase();
  const words = clean.split(/\s+/).filter((word) => word.length >= 3);
  return [clean, ...words.filter((word) => word !== clean)];
}

async function findRecipes(text) {
  for (const word of getSearchWords(text)) {
    const meals = await searchByIngredient(word);
    if (meals.length > 0) {
      // Only the fields the page needs, not the whole answer.
      const recipes = meals.slice(0, MAX_RECIPES).map((meal) => ({
        id: meal.idMeal,
        name: meal.strMeal,
        image: meal.strMealThumb,
        link: "https://www.themealdb.com/meal/" + meal.idMeal
      }));
      return { ingredient: word, recipes };
    }
  }
  return { ingredient: text.trim(), recipes: [] };
}

module.exports = { findRecipes };
