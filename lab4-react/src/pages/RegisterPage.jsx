import RegisterForm from "../components/RegisterForm.jsx";

export default function RegisterPage() {
  return (
    <>
      <div className="wrap page-title">
        <h1>Join your floor</h1>
        <p>Create a simulated account. It stays on this device, and your password is never saved.</p>
      </div>
      <section className="section section-white">
        <div className="wrap auth-layout">
          <RegisterForm />
          <div className="card">
            <span className="icon-tag"><img src="images/icons/label.svg" alt="" /></span>
            <h3>Your password</h3>
            <p>Use at least 8 characters with an uppercase letter, a lowercase letter and a digit.</p>
          </div>
        </div>
      </section>
    </>
  );
}
