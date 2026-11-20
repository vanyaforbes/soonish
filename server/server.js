// server.js - the Soonish backend. The React app asks it for the food list and sends changes to it.

const express = require("express");
const { food, createId } = require("./data.js");
const { validateFood } = require("./validators.js");
const { findRecipes } = require("./recipes.js");
const { suggestCategory, getClassifier, MODEL } = require("./ai.js");

const app = express();
// Settings come from the .env file (see .env.example).
const PORT = Number(process.env.PORT) || 3000;

// Turns a JSON request body into req.body.
app.use(express.json());

// Is the server alive?
app.get("/api/status", (req, res) => {
  res.json({ status: "ok" });
});

// READ: the whole fridge.
app.get("/api/food", (req, res) => {
  res.json(food);
});

// CREATE: add one item after validation.
app.post("/api/food", (req, res) => {
  const errors = validateFood(req.body);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  const item = {
    id: createId(),
    name: req.body.name.trim(),
    category: req.body.category,
    owner: req.body.owner.trim(),
    shelf: req.body.shelf,
    portions: req.body.portions,
    expiryDate: req.body.expiryDate,
    shared: req.body.shared === true
  };
  food.push(item);
  res.status(201).json(item);
});

// UPDATE: change one item, found by its id.
app.put("/api/food/:id", (req, res) => {
  const item = food.find((entry) => entry.id === Number(req.params.id));
  if (!item) {
    return res.status(404).json({ error: "Food not found" });
  }
  const updated = { ...item, ...req.body, id: item.id };
  const errors = validateFood(updated);
  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }
  Object.assign(item, updated);
  res.json(item);
});

// DELETE: remove one item.
app.delete("/api/food/:id", (req, res) => {
  const index = food.findIndex((entry) => entry.id === Number(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Food not found" });
  }
  food.splice(index, 1);
  res.status(204).end();
});

// EXTERNAL API: recipe ideas from TheMealDB for food that should be eaten soon.
// Example: GET /api/recipes?ingredient=chicken
app.get("/api/recipes", async (req, res) => {
  const ingredient = typeof req.query.ingredient === "string" ? req.query.ingredient.trim() : "";
  if (ingredient.length < 2 || ingredient.length > 40) {
    return res.status(400).json({ error: "Write an ingredient, 2 to 40 letters." });
  }
  try {
    const result = await findRecipes(ingredient);
    res.json(result);
  } catch (error) {
    console.error("TheMealDB error:", error.message);
    res.status(502).json({ error: "The recipe service is not answering. Try again later." });
  }
});

// AI: suggest a category for a food name typed in the form.
// Example: POST /api/ai/category with { "name": "Yogurt" }
app.post("/api/ai/category", async (req, res) => {
  const name = typeof req.body.name === "string" ? req.body.name.trim() : "";
  if (name.length < 2 || name.length > 60) {
    return res.status(400).json({ error: "Write the food name first, 2 to 60 letters." });
  }
  try {
    const suggestion = await suggestCategory(name);
    res.json({ name, ...suggestion, model: MODEL });
  } catch (error) {
    console.error("AI error:", error.message);
    res.status(503).json({ error: "The AI model is not ready. Try again in a minute." });
  }
});

app.listen(PORT, () => {
  console.log("Soonish server is running on http://localhost:" + PORT);
  // Load the AI model in the background, so the first question is fast.
  getClassifier()
    .then(() => console.log("AI model is ready: " + MODEL))
    .catch((error) => console.error("AI model could not load:", error.message));
});
