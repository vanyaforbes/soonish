export default function ContactPage() {
  return (
    <>
    <div className="wrap page-title">
      <h1>Contact and feedback</h1>
      <p>Tell us about your fridge, or ask how to start Soonish on your floor.</p>
    </div>
    <section className="section section-white">
      <div className="wrap split split-wide">
        <form className="form-box" onSubmit={(event) => event.preventDefault()}>
          <div className="field">
            <label htmlFor="name">Your name</label>
            <input id="name" name="name" type="text" autoComplete="name" required />
          </div>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input id="email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="field">
            <label htmlFor="topic">Topic</label>
            <select id="topic" name="topic">
              <option>Start Soonish on my floor</option>
              <option>Feedback about the website</option>
              <option>Other question</option>
            </select>
          </div>
          <div className="field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" required></textarea>
          </div>
          <button className="btn" type="submit">Send message</button>
        </form>
        <div className="card">
          <span className="icon-tag"><img src="images/icons/mail.svg" alt="" /></span>
          <h3>What happens next</h3>
          <p>This is a student project, so the form does not send anything yet. It shows how feedback will work on the finished website.</p>
        </div>
      </div>
    </section>
    </>
  );
}
