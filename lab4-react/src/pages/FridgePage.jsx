import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar.jsx";
import FoodForm from "../components/FoodForm.jsx";
import FoodList from "../components/FoodList.jsx";
import FridgeStats from "../components/FridgeStats.jsx";
import { addFood, deleteFood, getFood, updateFood } from "../utils/api.js";
import { daysLeft, getFreshness } from "../utils/freshness.js";

const DEFAULT_FILTERS = { query: "", state: "all", category: "all", sort: "expiry" };
const NO_MESSAGE = { kind: "", text: "" };
const SERVER_DOWN = "Could not reach the server. Start it with npm start in the server folder.";

function getVisibleItems(items, filters) {
  const query = filters.query.trim().toLowerCase();
  const visible = items.filter((item) => {
    const matchesText = item.name.toLowerCase().includes(query) || item.owner.toLowerCase().includes(query);
    const matchesCategory = filters.category === "all" || item.category === filters.category;
    let matchesState = true;
    if (filters.state === "shared") {
      matchesState = item.shared && getFreshness(item).state !== "expired";
    } else if (filters.state !== "all") {
      matchesState = getFreshness(item).state === filters.state;
    }
    return matchesText && matchesCategory && matchesState;
  });

  if (filters.sort === "name") {
    return visible.sort((a, b) => a.name.localeCompare(b.name));
  }
  if (filters.sort === "portions") {
    return visible.sort((a, b) => b.portions - a.portions);
  }
  return visible.sort((a, b) => daysLeft(a) - daysLeft(b));
}

export default function FridgePage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [message, setMessage] = useState(NO_MESSAGE);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [editingItem, setEditingItem] = useState(null);

  // Asks the server for the list: GET /api/food.
  async function loadFood() {
    setLoading(true);
    setLoadError("");
    try {
      const data = await getFood();
      setItems(data);
    } catch (error) {
      console.error(error);
      setLoadError(SERVER_DOWN);
    } finally {
      setLoading(false);
    }
  }

  // Runs once, when the page opens.
  useEffect(() => {
    loadFood();
  }, []);

  async function handleSave(data) {
    try {
      if (editingItem) {
        const updated = await updateFood(editingItem.id, data);
        setItems((current) => current.map((item) => (item.id === updated.id ? updated : item)));
        setMessage({ kind: "success", text: "Updated " + updated.name + "." });
        setEditingItem(null);
      } else {
        const created = await addFood(data);
        setItems((current) => [...current, created]);
        setMessage({ kind: "success", text: "Added " + created.name + "." });
      }
      return true;
    } catch (error) {
      console.error(error);
      setMessage({ kind: "failure", text: "Not saved. " + SERVER_DOWN });
      return false;
    }
  }

  async function handleDelete(item) {
    if (!window.confirm("Remove " + item.name + " from the fridge?")) {
      return;
    }
    try {
      await deleteFood(item.id);
      setItems((current) => current.filter((entry) => entry.id !== item.id));
      setMessage({ kind: "success", text: "Removed " + item.name + "." });
      if (editingItem && editingItem.id === item.id) {
        setEditingItem(null);
      }
    } catch (error) {
      console.error(error);
      setMessage({ kind: "failure", text: "Not removed. " + SERVER_DOWN });
    }
  }

  async function handleToggleShared(id) {
    const item = items.find((entry) => entry.id === id);
    try {
      const updated = await updateFood(id, { shared: !item.shared });
      setItems((current) => current.map((entry) => (entry.id === id ? updated : entry)));
    } catch (error) {
      console.error(error);
      setMessage({ kind: "failure", text: SERVER_DOWN });
    }
  }

  function renderList() {
    if (loading) {
      return <p className="empty-state" role="status">Loading the fridge from the server...</p>;
    }
    if (loadError) {
      return (
        <div className="empty-state load-error" role="alert">
          <p>{loadError}</p>
          <button className="btn" type="button" onClick={loadFood}>Try again</button>
        </div>
      );
    }
    return (
      <>
        <FridgeStats items={items} />
        <FilterBar filters={filters} onChange={setFilters} />
        <FoodList
          items={getVisibleItems(items, filters)}
          totalCount={items.length}
          onEdit={setEditingItem}
          onDelete={handleDelete}
          onToggleShared={handleToggleShared}
        />
      </>
    );
  }

  return (
    <>
      <div className="wrap page-title">
        <h1>The shared fridge</h1>
        <p>Everything on your floor, closest date first. The list is kept on the Soonish server, so the whole floor sees the same fridge.</p>
      </div>
      <section className="section section-white">
        <div className="wrap fridge-layout">
          <FoodForm editingItem={editingItem} onSave={handleSave} onCancel={() => setEditingItem(null)} message={message} />
          <div>{renderList()}</div>
        </div>
      </section>
    </>
  );
}
