import { CATEGORIES } from "../data/sampleItems.js";

// Controlled inputs: the values live in FridgePage, this component only shows and reports them.
export default function FilterBar({ filters, onChange }) {
  function handleChange(event) {
    onChange({ ...filters, [event.target.name]: event.target.value });
  }

  return (
    <div className="fridge-controls">
      <div>
        <label htmlFor="search">Search</label>
        <input id="search" name="query" type="search" placeholder="Food or owner" value={filters.query} onChange={handleChange} />
      </div>
      <div>
        <label htmlFor="state-filter">Status</label>
        <select id="state-filter" name="state" value={filters.state} onChange={handleChange}>
          <option value="all">All</option>
          <option value="soon">Eat soon</option>
          <option value="fresh">Fresh</option>
          <option value="expired">Expired</option>
          <option value="shared">Up for grabs</option>
        </select>
      </div>
      <div>
        <label htmlFor="category-filter">Category</label>
        <select id="category-filter" name="category" value={filters.category} onChange={handleChange}>
          <option value="all">All</option>
          {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="sort">Sort by</label>
        <select id="sort" name="sort" value={filters.sort} onChange={handleChange}>
          <option value="expiry">Closest date</option>
          <option value="name">Name</option>
          <option value="portions">Most portions</option>
        </select>
      </div>
    </div>
  );
}
