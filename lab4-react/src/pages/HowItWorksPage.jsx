export default function HowItWorksPage() {
  return (
    <>
    <div className="wrap page-title">
      <h1>How Soonish works</h1>
      <p>Three habits and one shared list. Here is what happens to a box of food from the moment it goes in.</p>
    </div>
    <section className="section section-white">
      <div className="wrap split">
        <div>
          <h2>From shelf to plate</h2>
          <ol className="step-list">
            <li><strong>Label.</strong> Write your name and the date on the food, and add it to the floor list.</li>
            <li><strong>Watch.</strong> The list counts down the days and warns you two days before the date.</li>
            <li><strong>Pass it on.</strong> If you will not eat it, mark it as up for grabs.</li>
            <li><strong>Enjoy.</strong> A neighbour takes it, and the item leaves the list.</li>
          </ol>
        </div>
        <img src="images/label-steps.svg" alt="Three steps shown as pictures: a marker writing a label, a clock, and a box marked free." width="520" height="340" />
      </div>
    </section>
    <section className="section">
      <div className="wrap">
        <h2>What makes Soonish different</h2>
        <p className="lead">Most food apps are built for one person. Soonish is built for a fridge with twenty owners.</p>
        <div className="card-grid">
        <div className="card">
          <span className="icon-tag"><img src="images/icons/fridge.svg" alt="" /></span>
          <h3>Made for shared fridges</h3>
          <p>Each item shows its owner and its shelf, so people find it quickly.</p>
        </div>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/share.svg" alt="" /></span>
          <h3>Permission to share</h3>
          <p>The up-for-grabs status makes taking food polite instead of awkward.</p>
        </div>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/bell.svg" alt="" /></span>
          <h3>Early warning</h3>
          <p>Two days of notice leaves enough time to cook, freeze or give food away.</p>
        </div>
        </div>
      </div>
    </section>
    </>
  );
}
