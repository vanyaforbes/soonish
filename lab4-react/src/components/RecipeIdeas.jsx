import { useEffect, useState } from "react";
import { getRecipes } from "../utils/api.js";
import { getFreshness, daysLeft } from "../utils/freshness.js";

// Lab 6: recipe ideas from the external API (TheMealDB), asked through our server.
// Props: items - the fridge list, so the ideas start from the food that must be eaten first.
export default function RecipeIdeas({ items }) {
  // Food that is still good, closest date first.
  const rescueList = items
    .filter((item) => getFreshness(item).state !== "expired")
    .sort((a, b) => daysLeft(a) - daysLeft(b))
    .slice(0, 4);

  const [ingredient, setIngredient] = useState("");
  // status: idle, loading, success or error
  const [search, setSearch] = useState({ status: "idle", data: null, error: "" });

  // Fill the empty field with the most urgent food once the list has loaded.
  const firstName = rescueList.length > 0 ? rescueList[0].name : "";
  useEffect(() => {
    setIngredient((current) => current || firstName);
  }, [firstName]);

  async function findRecipes(text) {
    const value = text.trim();
    if (value.length < 2) {
      setSearch({ status: "error", data: null, error: "Write an ingredient first." });
      return;
    }
    setIngredient(value);
    setSearch({ status: "loading", data: null, error: "" });
    try {
      const data = await getRecipes(value);
      setSearch({ status: "success", data, error: "" });
    } catch (error) {
      setSearch({ status: "error", data: null, error: error.message });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    findRecipes(ingredient);
  }

  function renderResult() {
    if (search.status === "loading") {
      return <p className="empty-state" role="status">Looking for recipes...</p>;
    }
    if (search.status === "error") {
      return <p className="empty-state load-error" role="alert">{search.error}</p>;
    }
    if (search.status === "success" && search.data.recipes.length === 0) {
      return <p className="empty-state">No recipes found for "{search.data.ingredient}". Try one main ingredient, like chicken or eggs.</p>;
    }
    if (search.status === "success") {
      return (
        <>
          <p className="recipe-found">Recipes with <strong>{search.data.ingredient}</strong>:</p>
          <div className="recipe-grid">
            {search.data.recipes.map((recipe) => (
              <a key={recipe.id} className="recipe-card" href={recipe.link} target="_blank" rel="noreferrer">
                <img src={recipe.image + "/medium"} alt="" loading="lazy" />
                <span>{recipe.name}</span>
              </a>
            ))}
          </div>
        </>
      );
    }
    return null;
  }

  return (
    <section className="section">
      <div className="wrap">
        <h2>Cook it before it spoils</h2>
        <p>Recipe ideas from TheMealDB for the food that has the least time left.</p>
        {rescueList.length > 0 && (
          <div className="rescue-chips">
            <span>Eat first:</span>
            {rescueList.map((item) => (
              <button key={item.id} className="chip" type="button" onClick={() => findRecipes(item.name)}>
                {item.name}
              </button>
            ))}
          </div>
        )}
        <form className="recipe-search" onSubmit={handleSubmit}>
          <label htmlFor="ingredient">Main ingredient</label>
          <input id="ingredient" value={ingredient} onChange={(event) => setIngredient(event.target.value)} />
          <button className="btn" type="submit" disabled={search.status === "loading"}>Find recipes</button>
        </form>
        {renderResult()}
        <p className="source-note">Recipes and photos: <a href="https://www.themealdb.com" target="_blank" rel="noreferrer">TheMealDB</a></p>
      </div>
    </section>
  );
}
