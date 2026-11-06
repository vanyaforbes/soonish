import FoodCard from "./FoodCard.jsx";

// Renders the project list with .map() and a unique key for every item.
export default function FoodList({ items, totalCount, onEdit, onDelete, onToggleShared }) {
  if (items.length === 0) {
    return (
      <p className="empty-state">
        {totalCount === 0 ? "The fridge is empty. Add the first item with the form." : "Nothing matches this search or filter."}
      </p>
    );
  }

  return (
    <div className="item-grid">
      {items.map((item) => (
        <FoodCard key={item.id} item={item} onEdit={onEdit} onDelete={onDelete} onToggleShared={onToggleShared} />
      ))}
    </div>
  );
}
