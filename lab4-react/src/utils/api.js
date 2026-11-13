// api.js - all requests from React to the Express server (server/server.js).
// "/api/..." goes to http://localhost:3000 through the proxy in vite.config.js.

async function request(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error("Server answered " + response.status);
  }
  if (response.status === 204) {
    return null;
  }
  return response.json();
}

function sendJSON(method, data) {
  return { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) };
}

export function getFood() {
  return request("/api/food");
}

export function addFood(data) {
  return request("/api/food", sendJSON("POST", data));
}

export function updateFood(id, data) {
  return request("/api/food/" + id, sendJSON("PUT", data));
}

export function deleteFood(id) {
  return request("/api/food/" + id, { method: "DELETE" });
}
