# Soonish

A shared-fridge helper for student dorms. Students see what is in the fridge, whose it is and how long it has left, and pass food on before it spoils.

Global challenge: food waste (based on the "Food waste reduction" topic of Lab 1).
Author: Abdulaziz, group 2601. Web Programming, 2026.

## One project, six labs

| Folder | Lab | What it adds |
| --- | --- | --- |
| `lab1/` | HTML | Topic, 4 HTML pages, presentation, contribution log |
| `lab2/` | CSS | Own design, 8 connected pages, design and AI plan |
| `lab3/` | JavaScript | Registration, login, CRUD fridge list with localStorage |
| `lab4-react/` | React | The same website as a React app (branch `lab4`) |
| `server/` | Node.js + Express | Backend for the fridge list; React loads it with fetch (branch `lab5`) |
| `server/` + `lab4-react/` | API + AI | Recipe ideas from TheMealDB and an AI category suggestion (branch `lab6`) |

Each lab continues the one before it. For Labs 1 to 3, open `index.html` in the folder. For Lab 4, see `lab4-react/README.md`.

## Run Labs 5 and 6 (server + client)

You need Node.js and internet for the first start. Open two terminals.

Terminal 1, the server:

```bash
cd server
copy .env.example .env
npm install
npm start
```

It runs on http://localhost:3000. Check it at http://localhost:3000/api/status. The first start downloads the AI model; wait for `AI model is ready`.

Terminal 2, the React client:

```bash
cd lab4-react
npm install
npm run dev
```

Open http://localhost:5173 and go to **Fridge**. The list comes from the server. If the server is off, the page shows an error and a **Try again** button.

Server routes are listed in `server/README.md`.

## Lab 6: what to try

On the **Fridge** page:

1. **AI request:** type a food name, for example `Greek yogurt`, and click **Suggest category with AI**. The category is filled in by the AI model.
2. **External API request:** scroll to **Cook it before it spoils** and click a food under **Eat first**, for example `Tomatoes`. Recipes come from TheMealDB through our server.

External API, model and environment variables are described in `server/README.md`.
