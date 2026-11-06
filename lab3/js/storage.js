// storage.js - safe helpers around localStorage, shared by every page.

const STORAGE_KEYS = {
  profile: "soonish.profile",
  session: "soonish.session",
  items: "soonish.items"
};

// Returns { ok, value }. ok is false when the saved text is corrupted or storage is blocked.
function readJSON(key, fallback) {
  try {
    const text = localStorage.getItem(key);
    if (text === null) {
      return { ok: true, value: fallback, missing: true };
    }
    return { ok: true, value: JSON.parse(text), missing: false };
  } catch (error) {
    console.error("Could not read " + key, error);
    return { ok: false, value: fallback, missing: false };
  }
}

function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save " + key, error);
    return false;
  }
}

function removeKey(key) {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Could not remove " + key, error);
  }
}

// Shows who is logged in (simulated) at the top of every page.
function renderUserChip() {
  const chip = document.querySelector("#user-chip");
  if (!chip) {
    return;
  }
  const session = readJSON(STORAGE_KEYS.session, null).value;
  if (session && session.name) {
    chip.textContent = "Hi, " + session.name;
  } else {
    chip.textContent = "";
  }
}

document.addEventListener("DOMContentLoaded", renderUserChip);
