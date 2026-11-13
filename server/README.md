# Soonish: Lab 5 (Node.js + Express server)

The first backend of Soonish. It keeps the shared-fridge list and the React app (`lab4-react/`) loads it with `fetch()`.

## Files

| File | What it does |
| --- | --- |
| `server.js` | Creates the Express app, `express.json()` and all routes |
| `data.js` | Own module: the temporary food array and `createId()` for unique ids |
| `validators.js` | Own module: `validateFood()` checks the data before it is saved |

## Routes

| Method and path | What it does | Answer |
| --- | --- | --- |
| `GET /api/status` | Checks that the server works | `{ "status": "ok" }` |
| `GET /api/food` | Returns the whole fridge | array of food objects |
| `POST /api/food` | Adds food after validation | `201` and the new object, or `400` and `{ errors }` |
| `PUT /api/food/:id` | Changes one item | the changed object, `400` or `404` |
| `DELETE /api/food/:id` | Removes one item | `204`, or `404` |

The data is kept in memory, so after a restart the fridge goes back to the 5 sample items.
