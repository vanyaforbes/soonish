# Soonish server (Labs 5 and 6, Node.js + Express)

The backend of Soonish. It keeps the shared-fridge list, asks an external recipe API and runs a small AI model. The React app (`lab4-react/`) talks only to this server.

## Files

| File | What it does |
| --- | --- |
| `server.js` | Creates the Express app, `express.json()` and all routes |
| `data.js` | Own module: the temporary food array and `createId()` for unique ids |
| `validators.js` | Own module: `validateFood()` checks the data before it is saved |
| `recipes.js` | Lab 6: calls the external API TheMealDB and keeps only useful fields |
| `ai.js` | Lab 6: AI model that suggests a category for a food name |
| `.env.example` | Example settings. Copy it to `.env` |

## Routes (our REST API)

| Method and path | What it does | Answer |
| --- | --- | --- |
| `GET /api/status` | Checks that the server works | `{ "status": "ok" }` |
| `GET /api/food` | Returns the whole fridge | array of food objects |
| `POST /api/food` | Adds food after validation | `201` and the new object, or `400` and `{ errors }` |
| `PUT /api/food/:id` | Changes one item | the changed object, `400` or `404` |
| `DELETE /api/food/:id` | Removes one item | `204`, or `404` |
| `GET /api/recipes?ingredient=chicken` | Lab 6: recipe ideas from TheMealDB | `{ ingredient, recipes: [{ id, name, image, link }] }`, `400` or `502` |
| `POST /api/ai/category` with `{ "name": "Yogurt" }` | Lab 6: AI suggests a category | `{ name, category, confidence, model }`, `400` or `503` |

The food list is kept in memory, so after a restart the fridge goes back to the 5 sample items.

## Lab 6: external API

- **API:** [TheMealDB](https://www.themealdb.com/api.php), free public recipe database.
- **Endpoint used:** `https://www.themealdb.com/api/json/v1/{MEALDB_API_KEY}/filter.php?i={ingredient}`
- **Why:** food that is close to its date should be cooked. The page offers recipes for the food with the least time left.
- The server calls it, not React. The key stays in `.env`. Only `id`, `name`, `image` and `link` go to the frontend, and at most 6 recipes.
- If the whole name finds nothing ("Chicken soup"), the server tries each word ("chicken").

## Lab 6: AI feature

- **What it does:** the user types a food name in the form and clicks **Suggest category with AI**. The model reads the name and picks one of the fridge categories (Dairy, Vegetables, Fruit, Meat, Leftovers, Other) and says how sure it is.
- **Type:** zero-shot classification.
- **Option used:** Transformers.js (`@huggingface/transformers`) with the Hugging Face model `Xenova/nli-deberta-v3-xsmall`. It runs on this computer, so no token is needed and no data leaves the server.
- The first start downloads the model (about 90 MB) into `server/.model-cache`. After that it works offline. The server loads the model in the background when it starts.

## Environment variables (`.env`)

| Name | Example | Meaning |
| --- | --- | --- |
| `PORT` | `3000` | Port of the server |
| `MEALDB_API_KEY` | `1` | TheMealDB key (`1` is the free test key) |
| `AI_MODEL` | `Xenova/nli-deberta-v3-xsmall` | Hugging Face model for the AI feature |

`.env` is in `.gitignore`, so keys never go to GitHub or into React code. Copy the example:

```bash
copy .env.example .env
```

## Run

```bash
npm install
npm start
```

Wait for `AI model is ready` in the terminal, then start the React app (see the main `README.md`).
