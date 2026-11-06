export default function AboutPage() {
  return (
    <>
    <div className="wrap page-title">
      <h1>About Soonish</h1>
      <p>Soonish is a Web Programming student project built around one global challenge: food waste.</p>
    </div>
    <section className="section section-white">
      <div className="wrap split">
        <div>
          <h2>Our goal</h2>
          <p>We want a dorm floor to throw away less food without extra effort. The website explains the problem, teaches simple habits and gives students one shared place to see what is in the fridge.</p>
          <p>It supports <a href="https://sdgs.un.org/goals/goal12">UN Sustainable Development Goal 12</a>, responsible consumption and production.</p>
        </div>
        <img src="images/dorm-floor.svg" alt="A dorm corridor with four numbered doors and one shared fridge at the end." width="520" height="340" />
      </div>
    </section>
    <section className="section">
      <div className="wrap">
        <h2>Image and icon sources</h2>
        <p>Every image was drawn by hand as SVG for this project, so no third-party images are used.</p>
        <div className="table-box">
          <table>
            <thead><tr><th scope="col">File</th><th scope="col">Used on</th><th scope="col">Source</th></tr></thead>
            <tbody>
              <tr><td>images/fridge-hero.svg</td><td>Home</td><td>Original</td></tr>
              <tr><td>images/waste-scale.svg</td><td>The problem</td><td>Original</td></tr>
              <tr><td>images/dorm-floor.svg</td><td>The problem, About</td><td>Original</td></tr>
              <tr><td>images/label-steps.svg</td><td>How it works</td><td>Original</td></tr>
              <tr><td>images/shelf-clock.svg</td><td>Shelf guide</td><td>Original</td></tr>
              <tr><td>images/rules-note.svg</td><td>Fridge rules</td><td>Original</td></tr>
              <tr><td>images/ai-rescue.svg</td><td>AI rescue</td><td>Original</td></tr>
              <tr><td>images/icons/ (10 icons)</td><td>Cards and buttons</td><td>Original</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
    </>
  );
}
