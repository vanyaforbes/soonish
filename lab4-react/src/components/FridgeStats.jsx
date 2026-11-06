import { getFreshness } from "../utils/freshness.js";

export default function FridgeStats({ items }) {
  const soonCount = items.filter((item) => getFreshness(item).state === "soon").length;
  const sharedCount = items.filter((item) => item.shared && getFreshness(item).state !== "expired").length;

  return (
    <div className="fridge-stats">
      <div className="fridge-stat"><strong>{items.length}</strong><span>items</span></div>
      <div className="fridge-stat"><strong>{soonCount}</strong><span>to eat soon</span></div>
      <div className="fridge-stat"><strong>{sharedCount}</strong><span>up for grabs</span></div>
    </div>
  );
}
