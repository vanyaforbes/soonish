// login.js - simulated login: checks the format and compares the email with the saved profile.

const loginForm = document.querySelector("#login-form");
const loginMessage = document.querySelector("#login-message");
const LOGIN_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function setLoginError(field, text) {
  document.querySelector("#" + field.id + "-error").textContent = text;
  field.classList.toggle("is-invalid", text !== "");
}

function validateLogin() {
  const email = loginForm.elements.email;
  const password = loginForm.elements.password;
  const emailError = LOGIN_EMAIL_PATTERN.test(email.value.trim()) ? "" : "Enter a valid email.";
  const passwordError = password.value.length >= 8 ? "" : "The password has at least 8 characters.";
  setLoginError(email, emailError);
  setLoginError(password, passwordError);
  return emailError === "" && passwordError === "";
}

function handleLogin(event) {
  event.preventDefault();
  loginMessage.className = "form-message";
  if (!validateLogin()) {
    return;
  }
  const profile = readJSON(STORAGE_KEYS.profile, null).value;
  const email = loginForm.elements.email.value.trim().toLowerCase();
  if (profile && profile.email === email) {
    writeJSON(STORAGE_KEYS.session, { name: profile.fullName.split(" ")[0], email: email });
    loginMessage.textContent = "Welcome back, " + profile.fullName + "! (simulated login)";
    loginMessage.classList.add("success");
    renderUserChip();
  } else {
    loginMessage.textContent = "No account with this email on this device. Register first.";
    loginMessage.classList.add("failure");
  }
}

loginForm.addEventListener("submit", handleLogin);
loginForm.addEventListener("input", () => {
  loginMessage.textContent = "";
});
