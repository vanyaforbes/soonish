export default function FridgeRulesPage() {
  return (
    <>
    <div className="wrap page-title">
      <h1>Fridge rules</h1>
      <p>A shared fridge works when everyone agrees on a few rules. Print these and tape them to the door.</p>
    </div>
    <section className="section section-white">
      <div className="wrap split">
        <img src="images/rules-note.svg" alt="A checklist note taped to a fridge door with three of four rules ticked." width="460" height="360" />
        <div>
          <h2>Four rules for the door</h2>
          <ol className="step-list">
            <li><strong>Name and date.</strong> Unlabelled food can be treated as shared.</li>
            <li><strong>Top shelf first.</strong> Keep ready food high and raw meat on the lowest shelf.</li>
            <li><strong>Ask or check the list.</strong> Take only what is marked up for grabs.</li>
            <li><strong>Sunday check.</strong> One person a week clears what has gone off.</li>
          </ol>
        </div>
      </div>
    </section>
    <section className="section">
      <div className="wrap">
        <h2>Before a long weekend</h2>
        <div className="card-grid">
        <div className="card">
          <span className="icon-tag"><img src="images/icons/share.svg" alt="" /></span>
          <h3>Give it away</h3>
          <p>Mark anything you will not finish before you leave.</p>
        </div>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/leaf.svg" alt="" /></span>
          <h3>Freeze it</h3>
          <p>If your floor has a freezer, freeze cooked food before its date.</p>
        </div>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/fridge.svg" alt="" /></span>
          <h3>Leave it clean</h3>
          <p>Wipe up spills, because a clean fridge shows what is really inside.</p>
        </div>
        </div>
      </div>
    </section>
    </>
  );
}
