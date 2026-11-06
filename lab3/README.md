# Soonish: Lab 3 (vanilla JavaScript)

Open `index.html` in a browser. No install is needed. There is no backend, and login is simulated.

## New in Lab 3

- `register.html` and `js/register.js`: validation of all fields, age from birthday, password strength, field-level errors.
- `login.html` and `js/login.js`: format validation and a simulated result.
- `fridge.html` and `js/fridge.js`: the CRUD module.
- `js/storage.js`: safe localStorage helpers with try/catch.

The password is never written to localStorage.

## Data model

```js
{ id: "item-1...", name: "Kefir", category: "Dairy", owner: "Dana",
  shelf: 1, expiryDate: "2026-11-07", portions: 2, shared: false }
```

## How one action works

Clicking **Pass it on** runs `handleGridClick()`, which calls `toggleShared(id)`. That calls `updateItem()`, which changes the object in the `items` array and runs `saveItems()` to update localStorage. Then `renderItems()` rebuilds the cards in the DOM.

## Tests that were run

| Test | Result |
| --- | --- |
| Invalid registration data | Field errors shown, submission stopped |
| Fixing a field | Its error disappears while typing |
| Valid registration | Profile saved without the password |
| Login with wrong format or unknown email | Clear error message |
| Empty CRUD list | Empty message shown |
| Create, Update, Delete | Array, cards and localStorage stay in sync |
| Refresh | Data stays |
| Search, status filter, sort | Work, with a message when nothing matches |
| Damaged saved data | List resets safely with a warning |
