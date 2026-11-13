# Soonish

A shared-fridge helper for student dorms. Students see what is in the fridge, whose it is and how long it has left, and pass food on before it spoils.

Global challenge: food waste (based on the "Food waste reduction" topic of Lab 1).
Author: Abdulaziz, group 2601. Web Programming, 2026.

## One project, five labs

| Folder | Lab | What it adds |
| --- | --- | --- |
| `lab1/` | HTML | Topic, 4 HTML pages, presentation, contribution log |
| `lab2/` | CSS | Own design, 8 connected pages, design and AI plan |
| `lab3/` | JavaScript | Registration, login, CRUD fridge list with localStorage |
| `lab4-react/` | React | The same website as a React app (branch `lab4`) |
| `server/` | Node.js + Express | Backend for the fridge list; React loads it with fetch (branch `lab5`) |

Each lab continues the one before it. For Labs 1 to 3, open `index.html` in the folder. For Lab 4, see `lab4-react/README.md`.

## Run Lab 5 (server + client)

You need Node.js. Open two terminals.

Terminal 1, the server:

```bash
cd server
npm install
npm start
```

It runs on http://localhost:3000. Check it at http://localhost:3000/api/status.

Terminal 2, the React client:

```bash
cd lab4-react
npm install
npm run dev
```

Open http://localhost:5173 and go to **Fridge**. The list comes from the server. If the server is off, the page shows an error and a **Try again** button.

Server routes are listed in `server/README.md`.
