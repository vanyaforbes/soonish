export default function ProblemPage() {
  return (
    <>
    <div className="wrap page-title">
      <h1>Food waste starts at home</h1>
      <p>Most people picture supermarkets and restaurants, but homes waste more food than both together.</p>
    </div>
    <section className="section section-white">
      <div className="wrap split">
        <div>
          <h2>A global problem</h2>
          <p>According to the <a href="https://www.unep.org/resources/publication/food-waste-index-report-2024">UNEP Food Waste Index Report 2024</a>, the world wasted about 1.05 billion tonnes of food in 2022. That is close to one fifth of the food available to consumers.</p>
          <p>Households were responsible for about 631 million tonnes, or 60 percent. Food service made up about 290 million tonnes and retail about 131 million tonnes.</p>
          <p>The UN wants to halve this. <a href="https://sdgs.un.org/goals/goal12">SDG target 12.3</a> calls for halving per capita food waste at the retail and consumer levels by 2030.</p>
        </div>
        <img src="images/waste-scale.svg" alt="A scale tipping towards a full bin of wasted food and away from a single plate of eaten food." width="520" height="380" />
      </div>
    </section>
    <section className="section">
      <div className="wrap split">
        <img src="images/dorm-floor.svg" alt="A dorm corridor with four numbered doors and one shared fridge at the end." width="520" height="340" />
        <div>
          <h2>Why a dorm makes it worse</h2>
          <p>A shared fridge has problems a family fridge does not. Many owners use it, and nobody can see the whole picture.</p>
          <ul className="tick-list">
            <li>Food has no name or date on it.</li>
            <li>Owners forget what they left at the back.</li>
            <li>Neighbours would eat it, but feel they cannot ask.</li>
            <li>Students leave for weekends and holidays.</li>
          </ul>
        </div>
      </div>
    </section>
    </>
  );
}
