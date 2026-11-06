// register.js - validation for the registration form (client side only).

const MIN_AGE = 16;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const form = document.querySelector("#register-form");
const message = document.querySelector("#register-message");

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

function checkPasswordStrength(password) {
  if (password.length < 8) {
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

// Each validator returns an error text, or "" when the value is fine.
const validators = {
  fullName(value) {
    if (value.trim().length === 0) {
      return "Enter your full name.";
    }
    return value.trim().length < 3 ? "The name is too short." : "";
  },
  email(value) {
    if (value.trim() === "") {
      return "Enter your email.";
    }
    return EMAIL_PATTERN.test(value.trim()) ? "" : "This email format is not valid.";
  },
  birthday(value) {
    if (value === "") {
      return "Enter your birthday.";
    }
    const age = calculateAge(value);
    if (Number.isNaN(age) || age < 0 || age > 120) {
      return "Check this date.";
    } else if (age < MIN_AGE) {
      return "You must be at least " + MIN_AGE + " years old.";
    }
    return "";
  },
  floor(value) {
    const floor = Number(value);
    if (value === "") {
      return "Choose your floor.";
    }
    return floor >= 1 && floor <= 9 ? "" : "Choose a floor from 1 to 9.";
  },
  password(value) {
    return value === "" ? "Enter a password." : checkPasswordStrength(value);
  },
  confirmPassword(value) {
    if (value === "") {
      return "Repeat your password.";
    }
    return value === form.elements.password.value ? "" : "Passwords do not match.";
  },
  consent(value, field) {
    return field.checked ? "" : "Please accept the fridge rules.";
  }
};

function showFieldState(field, errorText) {
  const errorBox = document.querySelector("#" + field.id + "-error");
  errorBox.textContent = errorText;
  field.classList.toggle("is-invalid", errorText !== "");
  field.classList.toggle("is-valid", errorText === "");
  field.setAttribute("aria-invalid", String(errorText !== ""));
}

function validateField(name) {
  const field = form.elements[name];
  const errorText = validators[name](field.value, field);
  showFieldState(field, errorText);
  return errorText === "";
}

function validateForm() {
  let isValid = true;
  for (const name of Object.keys(validators)) {
    if (!validateField(name)) {
      isValid = false;
    }
  }
  return isValid;
}

function saveProfile() {
  // The password is deliberately left out: it is never written to localStorage.
  const profile = {
    fullName: form.elements.fullName.value.trim(),
    email: form.elements.email.value.trim().toLowerCase(),
    birthday: form.elements.birthday.value,
    age: calculateAge(form.elements.birthday.value),
    floor: Number(form.elements.floor.value)
  };
  return writeJSON(STORAGE_KEYS.profile, profile);
}

function handleSubmit(event) {
  event.preventDefault();
  message.className = "form-message";
  if (!validateForm()) {
    message.textContent = "Please fix the fields marked in red.";
    message.classList.add("failure");
    const firstInvalid = form.querySelector(".is-invalid");
    firstInvalid.focus();
    return;
  }
  if (saveProfile()) {
    message.textContent = "Account created on this device. You can log in now.";
    message.classList.add("success");
    form.reset();
    form.querySelectorAll(".is-valid").forEach((field) => field.classList.remove("is-valid"));
  } else {
    message.textContent = "Your browser blocked saving. Please try another browser.";
    message.classList.add("failure");
  }
}

function handleFieldChange(event) {
  const name = event.target.name;
  if (validators[name]) {
    validateField(name);
    // Changing the password can fix or break the confirmation.
    if (name === "password" && form.elements.confirmPassword.value !== "") {
      validateField("confirmPassword");
    }
  }
}

form.addEventListener("submit", handleSubmit);
form.addEventListener("input", handleFieldChange);
form.addEventListener("change", handleFieldChange);
