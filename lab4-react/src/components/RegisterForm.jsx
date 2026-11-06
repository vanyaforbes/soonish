import { useState } from "react";
import { validateRegistration } from "../utils/validation.js";
import { STORAGE_KEYS, writeJSON } from "../utils/storage.js";

const EMPTY_FORM = { fullName: "", email: "", birthday: "", floor: "", password: "", confirmPassword: "", consent: false };
const FLOORS = [1, 2, 3, 4, 5];

export default function RegisterForm() {
  const [values, setValues] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState(false);
  const [message, setMessage] = useState(null);

  function handleChange(event) {
    const { name, type, checked, value } = event.target;
    const next = { ...values, [name]: type === "checkbox" ? checked : value };
    setValues(next);
    setMessage(null);
    // After the first submit, errors update while the user fixes the input.
    if (touched) {
      setErrors(validateRegistration(next));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    const foundErrors = validateRegistration(values);
    setErrors(foundErrors);
    setTouched(true);
    if (Object.keys(foundErrors).length > 0) {
      setMessage({ kind: "failure", text: "Please fix the fields marked in red." });
      return;
    }
    // The password is deliberately left out: it is never written to localStorage.
    const { fullName, email, birthday, floor } = values;
    const saved = writeJSON(STORAGE_KEYS.profile, { fullName: fullName.trim(), email: email.trim().toLowerCase(), birthday, floor: Number(floor) });
    if (saved) {
      setMessage({ kind: "success", text: "Account created on this device." });
      setValues(EMPTY_FORM);
      setTouched(false);
    } else {
      setMessage({ kind: "failure", text: "Your browser blocked saving. Please try another browser." });
    }
  }

  function renderField(name, label, type, autoComplete) {
    return (
      <div className="field">
        <label htmlFor={name}>{label}</label>
        <input
          id={name}
          name={name}
          type={type}
          value={values[name]}
          autoComplete={autoComplete}
          className={errors[name] ? "is-invalid" : undefined}
          onChange={handleChange}
        />
        <span className="field-error">{errors[name]}</span>
      </div>
    );
  }

  return (
    <form className="form-box" onSubmit={handleSubmit} noValidate>
      {renderField("fullName", "Full name", "text", "name")}
      {renderField("email", "Email", "email", "email")}
      {renderField("birthday", "Birthday", "date", "bday")}
      <div className="field">
        <label htmlFor="floor">Dorm floor</label>
        <select id="floor" name="floor" value={values.floor} className={errors.floor ? "is-invalid" : undefined} onChange={handleChange}>
          <option value="">Choose a floor</option>
          {FLOORS.map((floor) => <option key={floor} value={floor}>Floor {floor}</option>)}
        </select>
        <span className="field-error">{errors.floor}</span>
      </div>
      {renderField("password", "Password", "password", "new-password")}
      {renderField("confirmPassword", "Confirm password", "password", "new-password")}
      <div className="field">
        <label className="check-row" htmlFor="consent">
          <input id="consent" name="consent" type="checkbox" checked={values.consent} onChange={handleChange} />
          <span>I accept the <a href="#/fridge-rules">fridge rules</a>.</span>
        </label>
        <span className="field-error">{errors.consent}</span>
      </div>
      <button className="btn" type="submit">Create account</button>
      {message && <p className={"form-message " + message.kind} role="status">{message.text}</p>}
    </form>
  );
}
