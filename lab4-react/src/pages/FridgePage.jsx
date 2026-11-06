import { useEffect, useState } from "react";
import FilterBar from "../components/FilterBar.jsx";
import FoodForm from "../components/FoodForm.jsx";
import FoodList from "../components/FoodList.jsx";
import FridgeStats from "../components/FridgeStats.jsx";
import { createId, createSampleItems } from "../data/sampleItems.js";
import { daysLeft, getFreshness } from "../utils/freshness.js";
import { STORAGE_KEYS, readJSON, writeJSON } from "../utils/storage.js";

const DEFAULT_FILTERS = { query: "", state: "all", category: "all", sort: "expiry" };

// Runs once. Handles missing and damaged saved data, like loadItems() in Lab 3.
function loadInitialState() {
  const saved = readJSON(STORAGE_KEYS.items, null);
  if (!saved.ok || (!saved.missing && !Array.isArray(saved.value))) {
    return { items: [], message: { kind: "failure", text: "Saved data was damaged, so the list was reset." } };
  }
  if (saved.missing) {
    return { items: createSampleItems(), message: { kind: "", text: "" } };
  }
  return { items: saved.value, message: { kind: "", text: "" } };
}

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
  const [initial] = useState(loadInitialState);
  const [items, setItems] = useState(initial.items);
  const [message, setMessage] = useState(initial.message);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [editingItem, setEditingItem] = useState(null);

  // Every change to the array is written to localStorage automatically.
  useEffect(() => {
    if (!writeJSON(STORAGE_KEYS.items, items)) {
      setMessage({ kind: "failure", text: "Changes could not be saved in this browser." });
    }
  }, [items]);

  function handleSave(data) {
    if (editingItem) {
      setItems((current) => current.map((item) => (item.id === editingItem.id ? { ...item, ...data } : item)));
      setMessage({ kind: "success", text: "Updated " + data.name + "." });
      setEditingItem(null);
    } else {
      setItems((current) => [...current, { id: createId(), ...data }]);
      setMessage({ kind: "success", text: "Added " + data.name + "." });
    }
  }

  function handleDelete(item) {
    if (!window.confirm("Remove " + item.name + " from the fridge?")) {
      return;
    }
    setItems((current) => current.filter((entry) => entry.id !== item.id));
    setMessage({ kind: "success", text: "Removed " + item.name + "." });
    if (editingItem && editingItem.id === item.id) {
      setEditingItem(null);
    }
  }

  function handleToggleShared(id) {
    setItems((current) => current.map((item) => (item.id === id ? { ...item, shared: !item.shared } : item)));
  }

  return (
    <>
      <div className="wrap page-title">
        <h1>The shared fridge</h1>
        <p>Everything on your floor, closest date first. Food stays saved in this browser after a refresh.</p>
      </div>
      <section className="section section-white">
        <div className="wrap fridge-layout">
          <FoodForm editingItem={editingItem} onSave={handleSave} onCancel={() => setEditingItem(null)} message={message} />
          <div>
            <FridgeStats items={items} />
            <FilterBar filters={filters} onChange={setFilters} />
            <FoodList
              items={getVisibleItems(items, filters)}
              totalCount={items.length}
              onEdit={setEditingItem}
              onDelete={handleDelete}
              onToggleShared={handleToggleShared}
            />
          </div>
        </div>
      </section>
    </>
  );
}
