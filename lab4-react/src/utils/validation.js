import { daysLeft } from "./freshness.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const MIN_AGE = 16;

export function validateItem(data, isEditing) {
  const errors = {};
  if (data.name.length < 2) {
    errors.name = "Write what the food is.";
  }
  if (data.category === "") {
    errors.category = "Choose a category.";
  }
  if (data.owner.length < 2) {
    errors.owner = "Whose food is it?";
  }
  if (!Number.isInteger(data.shelf) || data.shelf < 1 || data.shelf > 5) {
    errors.shelf = "Shelf 1 to 5.";
  }
  if (data.expiryDate === "") {
    errors.expiryDate = "Choose a date.";
  } else if (!isEditing && daysLeft(data) < 0) {
    errors.expiryDate = "New food cannot be expired.";
  }
  if (!Number.isInteger(data.portions) || data.portions < 1 || data.portions > 50) {
    errors.portions = "1 to 50 portions.";
  }
  return errors;
}

function calculateAge(birthdayText) {
  const birthday = new Date(birthdayText);
  const today = new Date();
  let age = today.getFullYear() - birthday.getFullYear();
  const monthGap = today.getMonth() - birthday.getMonth();
  if (monthGap < 0 || (monthGap === 0 && today.getDate() < birthday.getDate())) {
    age = age - 1;
  }
  return age;
}

function checkPassword(password) {
  if (password === "") {
    return "Enter a password.";
  } else if (password.length < 8) {
    return "Use at least 8 characters.";
  } else if (!/[A-Z]/.test(password)) {
    return "Add an uppercase letter.";
  } else if (!/[a-z]/.test(password)) {
    return "Add a lowercase letter.";
  } else if (!/[0-9]/.test(password)) {
    return "Add a digit.";
  }
  return "";
}

export function validateRegistration(values) {
  const errors = {};
  if (values.fullName.trim().length < 3) {
    errors.fullName = "Enter your full name.";
  }
  if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Enter a valid email.";
  }
  if (values.birthday === "") {
    errors.birthday = "Enter your birthday.";
  } else if (calculateAge(values.birthday) < MIN_AGE) {
    errors.birthday = "You must be at least " + MIN_AGE + " years old.";
  }
  if (values.floor === "") {
    errors.floor = "Choose your floor.";
  }
  const passwordError = checkPassword(values.password);
  if (passwordError !== "") {
    errors.password = passwordError;
  }
  if (values.confirmPassword !== values.password || values.confirmPassword === "") {
    errors.confirmPassword = "Passwords do not match.";
  }
  if (!values.consent) {
    errors.consent = "Please accept the fridge rules.";
  }
  return errors;
}
