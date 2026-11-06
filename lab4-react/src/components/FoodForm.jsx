import { useEffect, useState } from "react";
import { CATEGORIES } from "../data/sampleItems.js";
import { validateItem } from "../utils/validation.js";

const EMPTY_FORM = { name: "", category: "", owner: "", shelf: "", portions: "", expiryDate: "", shared: false };

// Add and edit form. Props: editingItem (null when adding), onSave, onCancel, message.
export default function FoodForm({ editingItem, onSave, onCancel, message }) {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});

  // When the parent picks an item to edit, copy it into the form.
  useEffect(() => {
    setValues(editingItem ? { ...editingItem } : EMPTY_FORM);
    setErrors({});
  }, [editingItem]);

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    setValues((current) => ({ ...current, [name]: type === "checkbox" ? checked : value }));
  }

  function handleSubmit(event) {
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
      onSave(data);
      setValues(EMPTY_FORM);
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
