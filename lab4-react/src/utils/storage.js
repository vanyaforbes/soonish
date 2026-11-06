export const STORAGE_KEYS = {
  profile: "soonish.react.profile",
  items: "soonish.react.items"
};

export function readJSON(key, fallback) {
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

export function writeJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save " + key, error);
    return false;
  }
}
