export default function AiRescuePage() {
  return (
    <>
    <div className="wrap page-title">
      <h1>AI Rescue Recipes</h1>
      <p>Our planned AI feature turns the food closest to its date into a simple meal. It is a plan and is not built yet.</p>
    </div>
    <section className="section section-white">
      <div className="wrap split">
        <div>
          <h2>How it would work</h2>
          <ul className="tick-list">
            <li><strong>Input:</strong> items expiring within two days, with portions, plus an optional diet choice.</li>
            <li><strong>Output:</strong> up to three cheap recipes, starting with the most urgent item.</li>
            <li><strong>Where:</strong> a Rescue button on the shared fridge list.</li>
            <li><strong>Approach:</strong> connect an existing language model through an API.</li>
          </ul>
          <p>A small server would call the model, so the secret API key never reaches the browser.</p>
        </div>
        <img src="images/ai-rescue.svg" alt="Three expiring ingredients, kefir, rice and carrots, passing through a spark and becoming one recipe card." width="520" height="380" />
      </div>
    </section>
    <section className="section">
      <div className="wrap split">
        <div className="ai-example">
          <h3>Example result (written by hand)</h3>
          <p><strong>Input:</strong> kefir (today), rice (1 day), carrots (2 days).</p>
          <p><strong>Suggestion:</strong> Carrot rice with a kefir sauce. Fry the grated carrots, add the rice, then serve with kefir, salt and garlic.</p>
          <p><strong>Still needed:</strong> oil, garlic.</p>
        </div>
        <div>
          <h2>Honest limits</h2>
          <ul className="tick-list">
            <li>The model can invent steps, so recipes need a human eye.</li>
            <li>It cannot tell if food is safe. Students still check it.</li>
            <li>It does not know allergies unless a user tells it.</li>
            <li>Each request costs money and needs internet access.</li>
          </ul>
        </div>
      </div>
    </section>
    </>
  );
}
