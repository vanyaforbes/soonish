# Soonish: Lab 4 (React)

The Lab 3 website moved to React. The topic is the same: a shared-fridge helper for student dorms.

## Install and run

You need Node.js.

```bash
cd lab4-react
npm install
npm run dev
```

Open the address shown in the terminal, usually http://localhost:5173. To make a production build, run `npm run build`.

## How the requirements are met

| Requirement | Where |
| --- | --- |
| At least 4 components | Header, Footer, FoodCard, FoodList, FoodForm, FilterBar, FridgeStats, RegisterForm |
| Props in at least 2 | Header, FoodCard, FoodList, FoodForm, FilterBar, FridgeStats |
| useState for at least 2 values | items, filters, editingItem, message in FridgePage; values, errors in FoodForm |
| List with .map() and key | FoodList: `items.map((item) => <FoodCard key={item.id} ... />)` |
| Lab 3 features moved | CRUD list, search and filter, registration validation |
| Responsive styling | src/styles/, adapted from Lab 3 |

## One event handler explained

`handleToggleShared(id)` in FridgePage is passed down through FoodList to FoodCard as the `onToggleShared` prop. A click on **Pass it on** calls it, and `setItems()` creates a new array. React re-renders the cards, and `useEffect` saves the array to localStorage.

## Screenshots

See `docs/screenshots/`.
