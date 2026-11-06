export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-row">
          <div>
            <h2>Soonish</h2>
            <p>A shared-fridge helper for student dorms.</p>
          </div>
          <div>
            <h2>Sources</h2>
            <ul>
              <li><a href="https://www.unep.org/resources/publication/food-waste-index-report-2024">UNEP Food Waste Index 2024</a></li>
              <li><a href="https://sdgs.un.org/goals/goal12">UN SDG 12</a></li>
            </ul>
          </div>
          <div>
            <h2>Get in touch</h2>
            <ul>
              <li><a href="#/contact">Contact and feedback</a></li>
              <li><a href="#/about">About the project</a></li>
            </ul>
          </div>
        </div>
        <p className="footer-note">Web Programming student project, 2026. All illustrations are original.</p>
      </div>
    </footer>
  );
}
