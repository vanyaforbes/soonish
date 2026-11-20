import { useEffect, useState } from "react";
import { CATEGORIES } from "../data/sampleItems.js";
import { suggestCategory } from "../utils/api.js";
import { validateItem } from "../utils/validation.js";

const EMPTY_FORM = { name: "", category: "", owner: "", shelf: "", portions: "", expiryDate: "", shared: false };

// Add and edit form. Props: editingItem (null when adding), onSave, onCancel, message.
export default function FoodForm({ editingItem, onSave, onCancel, message }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  // Lab 6: state of the AI suggestion: idle, loading, success or error.
  const [ai, setAi] = useState({ status: "idle", text: "" });

  // When the parent picks an item to edit, copy it into the form.
  useEffect(() => {
    setValues(editingItem ? { ...editingItem } : EMPTY_FORM);
    setErrors({});
    setAi({ status: "idle", text: "" });
  }, [editingItem]);

  // Sends the food name to the server; the AI model answers with a category.
  async function handleSuggestCategory() {
    const name = values.name.trim();
    if (name.length < 2) {
      setAi({ status: "error", text: "Write the food name first." });
      return;
    }
    setAi({ status: "loading", text: "AI is reading \"" + name + "\"..." });
    try {
      const result = await suggestCategory(name);
      setValues((current) => ({ ...current, category: result.category }));
      setAi({ status: "success", text: "AI suggests " + result.category + " (" + result.confidence + "% sure). You can change it." });
    } catch (error) {
      setAi({ status: "error", text: error.message });
    }
  }

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const data = {
      name: values.name.trim(),
      category: values.category,
      owner: values.owner.trim(),
      shelf: Number(values.shelf),
      portions: Number(values.portions),
      expiryDate: values.expiryDate,
      shared: values.shared
    };
    const foundErrors = validateItem(data, editingItem !== null);
    setErrors(foundErrors);
    if (Object.keys(foundErrors).length === 0) {
      // onSave sends the data to the server. Clear the form only if the server accepted it.
      const saved = await onSave(data);
      if (saved) {
        setValues(EMPTY_FORM);
        setAi({ status: "idle", text: "" });
      }
    }
  }

  function renderField(name, label, type, extra = {}) {
    return (
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={values[name]}
          className={errors[name] ? "is-invalid" : undefined}
          onChange={handleChange}
          {...extra}
        />
        <span className="field-error">{errors[name]}</span>
      </div>
    );
  }

  return (
    <form className="form-box" onSubmit={handleSubmit} noValidate>
      <h2>{editingItem ? "Edit " + editingItem.name : "Add food"}</h2>
      {renderField("name", "Food", "text")}
      <div className="field">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={values.category}
          className={errors.category ? "is-invalid" : undefined}
          onChange={handleChange}
        >
          <option value="">Choose</option>
          {CATEGORIES.map((category) => <option key={category}>{category}</option>)}
        </select>
        <span className="field-error">{errors.category}</span>
        <button className="ai-btn" type="button" onClick={handleSuggestCategory} disabled={ai.status === "loading"}>
          ✨ Suggest category with AI
        </button>
        {ai.text && <p className={"ai-note ai-" + ai.status} role="status">{ai.text}</p>}
      </div>
      {renderField("owner", "Owner", "text")}
      <div className="field-pair">
        {renderField("shelf", "Shelf", "number", { min: 1, max: 5 })}
        {renderField("portions", "Portions", "number", { min: 1, max: 50 })}
      </div>
      {renderField("expiryDate", "Eat by", "date")}
      <div className="field">
        <label className="check-row" htmlFor="shared">
          <input id="shared" name="shared" type="checkbox" checked={values.shared} onChange={handleChange} />
          <span>Up for grabs: anyone can take it</span>
        </label>
      </div>
      <div className="form-buttons">
        <button className="btn" type="submit">{editingItem ? "Save changes" : "Put in the fridge"}</button>
        {editingItem && <button className="btn btn-plain" type="button" onClick={onCancel}>Cancel</button>}
      </div>
      {message.text && <p className={"form-message " + message.kind} role="status">{message.text}</p>}
    </form>
  );
}
