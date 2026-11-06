export default function HomePage() {
  return (
    <>
    <section className="wrap hero">
      <div className="hero-text">
        <span className="tape-note">for students who share a fridge</span>
        <h1>Good food should not die at the back of the fridge</h1>
        <p className="lead">Soonish shows a whole dorm floor what is in the shared fridge, whose it is and how long it has left. If you will not finish something, pass it on before it spoils.</p>
        <div className="hero-actions">
          <a className="btn" href="#/fridge">Open the fridge</a>
          <a className="btn btn-plain" href="#/problem">Why it matters</a>
        </div>
      </div>
      <img src="images/fridge-hero.svg" alt="An open shared fridge with food boxes labelled with owners and dates, such as Aidar: Fri and free for all." width="520" height="460" />
    </section>

    <section className="section section-white">
      <div className="wrap">
        <h2>Three habits, one calmer kitchen</h2>
        <p className="lead">You do not need new equipment. You need clear labels and permission to share.</p>
        <div className="card-grid">
        <div className="card">
          <span className="icon-tag"><img src="images/icons/label.svg" alt="" /></span>
          <h3>Label it</h3>
          <p>Every item gets an owner and a date, so nothing in the fridge is a mystery.</p>
        </div>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/clock.svg" alt="" /></span>
          <h3>Watch the clock</h3>
          <p>The food closest to its date moves to the top of the list.</p>
        </div>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/share.svg" alt="" /></span>
          <h3>Pass it on</h3>
          <p>Mark food as up for grabs, and your neighbours can eat it without asking.</p>
        </div>
        </div>
      </div>
    </section>

    <section className="section section-ink">
      <div className="wrap">
        <h2>Why this is worth doing</h2>
        <p className="lead">Figures from the <a href="https://www.unep.org/resources/publication/food-waste-index-report-2024">UNEP Food Waste Index Report 2024</a>, for the year 2022.</p>
        <div className="stat-row">
          <div className="stat"><strong>1.05 bn</strong><span>tonnes of food wasted worldwide</span></div>
          <div className="stat"><strong>60%</strong><span>of that waste came from households</span></div>
          <div className="stat"><strong>79 kg</strong><span>wasted at home per person each year</span></div>
        </div>
      </div>
    </section>
    </>
  );
}
