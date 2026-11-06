const SOON_DAYS = 2;
const DAY_MS = 24 * 60 * 60 * 1000;

function toDateText(date) {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return date.getFullYear() + "-" + month + "-" + day;
}

export function dateFromToday(days) {
  return toDateText(new Date(Date.now() + days * DAY_MS));
}

export function daysLeft(item) {
  const today = new Date(toDateText(new Date()));
  return Math.round((new Date(item.expiryDate) - today) / DAY_MS);
}

export function getFreshness(item) {
  const days = daysLeft(item);
  if (days < 0) {
    return { state: "expired", label: "Expired" };
  } else if (days === 0) {
    return { state: "soon", label: "Eat today" };
  } else if (days <= SOON_DAYS) {
    return { state: "soon", label: days === 1 ? "1 day left" : days + " days left" };
  }
  return { state: "fresh", label: days + " days left" };
}
