import { dateFromToday } from "../utils/freshness.js";

export const CATEGORIES = ["Leftovers", "Dairy", "Vegetables", "Fruit", "Meat", "Other"];

export function createId() {
  return "item-" + Date.now() + "-" + Math.floor(Math.random() * 100000);
}

export function createSampleItems() {
  return [
    { id: createId(), name: "Plov from Sunday", category: "Leftovers", owner: "Aidar", shelf: 2, expiryDate: dateFromToday(1), portions: 3, shared: true },
    { id: createId(), name: "Kefir", category: "Dairy", owner: "Dana", shelf: 1, expiryDate: dateFromToday(0), portions: 2, shared: false },
    { id: createId(), name: "Tomatoes", category: "Vegetables", owner: "Madina", shelf: 4, expiryDate: dateFromToday(5), portions: 4, shared: false },
    { id: createId(), name: "Chicken soup", category: "Leftovers", owner: "Timur", shelf: 2, expiryDate: dateFromToday(-1), portions: 1, shared: false },
    { id: createId(), name: "Eggs", category: "Dairy", owner: "Kamila", shelf: 3, expiryDate: dateFromToday(14), portions: 6, shared: false }
  ];
}
