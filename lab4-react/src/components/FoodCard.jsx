import { getFreshness } from "../utils/freshness.js";

// One food item. Props: item, and three callbacks that tell the parent what the user did.
export default function FoodCard({ item, onEdit, onDelete, onToggleShared }) {
  const freshness = getFreshness(item);
  const isExpired = freshness.state === "expired";
  const showShared = item.shared && !isExpired;
  const classes = ["item-card", "state-" + freshness.state];
  if (showShared) {
    classes.push("is-shared");
  }

  return (
    <article className={classes.join(" ")}>
      <div className="badge-row">
        <span className={"badge badge-" + freshness.state}>{freshness.label}</span>
        {showShared && <span className="badge badge-shared">Up for grabs</span>}
      </div>
      <h3>{item.name}</h3>
      <p className="item-meta">
        {item.category} · {item.owner} · shelf {item.shelf} · {item.portions} {item.portions === 1 ? "portion" : "portions"}
      </p>
      <div className="item-actions">
        {isExpired ? (
          <span className="item-note">Do not share</span>
        ) : (
          <button type="button" className="share-btn" onClick={() => onToggleShared(item.id)}>
            {item.shared ? "Keep it" : "Pass it on"}
          </button>
        )}
        <button type="button" className="icon-btn" aria-label={"Edit " + item.name} onClick={() => onEdit(item)}>
          <img src="images/icons/pencil.svg" alt="" />
        </button>
        <button type="button" className="icon-btn" aria-label={"Delete " + item.name} onClick={() => onDelete(item)}>
          <img src="images/icons/trash.svg" alt="" />
        </button>
      </div>
    </article>
  );
}
