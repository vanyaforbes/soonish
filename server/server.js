// server.js - the Soonish backend. The React app asks it for the food list and sends changes to it.

const express = require("express");
const { food, createId } = require("./data.js");
const { validateFood } = require("./validators.js");

const app = express();
const PORT = 3000;

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

app.listen(PORT, () => {
  console.log("Soonish server is running on http://localhost:" + PORT);
});
