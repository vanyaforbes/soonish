export default function ShelfGuidePage() {
  return (
    <>
    <div className="wrap page-title">
      <h1>Shelf guide</h1>
      <p>A quick look at how long common dorm foods keep in the fridge, and what the dates on packages mean.</p>
    </div>
    <section className="section section-white">
      <div className="wrap split split-wide">
        <div>
          <h2>How long does it last?</h2>
          <p>These are general guidelines. Always follow the package, and see <a href="https://www.foodsafety.gov/keep-food-safe/foodkeeper-app">FoodKeeper on FoodSafety.gov</a> for more foods.</p>
          <div className="table-box">
            <table>
              <thead><tr><th scope="col">Food</th><th scope="col">In the fridge</th></tr></thead>
              <tbody>
                <tr><td>Raw chicken or minced meat</td><td>1 to 2 days</td></tr>
                <tr><td>Cooked leftovers</td><td>3 to 4 days</td></tr>
                <tr><td>Opened lunch meat</td><td>3 to 5 days</td></tr>
                <tr><td>Milk</td><td>About 7 days</td></tr>
                <tr><td>Yogurt</td><td>1 to 2 weeks</td></tr>
                <tr><td>Eggs in the shell</td><td>3 to 5 weeks</td></tr>
              </tbody>
            </table>
          </div>
        </div>
        <img src="images/shelf-clock.svg" alt="Three foods on a shelf marked with 5, 2 and 0 days left, from fresh to eat today." width="520" height="340" />
      </div>
    </section>
    <section className="section">
      <div className="wrap">
        <h2>Reading the date on a package</h2>
        <div className="card-grid">
        <div className="card">
          <span className="icon-tag"><img src="images/icons/bell.svg" alt="" /></span>
          <h3>Use by</h3>
          <p>This is the date to take seriously. Follow it, even if the food looks fine.</p>
        </div>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/leaf.svg" alt="" /></span>
          <h3>Best before</h3>
          <p>This is about quality. Food stored well is often fine after this date, so check it first.</p>
        </div>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/clock.svg" alt="" /></span>
          <h3>Sell by</h3>
          <p>This date is for the shop. It does not tell you when food stops being good.</p>
        </div>
        </div>
      </div>
    </section>
    </>
  );
}
