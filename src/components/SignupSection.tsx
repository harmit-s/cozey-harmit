import React from "react";
import "../styles/SignupSection.scss";

const SignupSection: React.FC = () => {
  return (
    <section className="signup">
      <div className="signup__content">
        <p className="signup__text">
          Join the Cozey Family to stay ahead on product launches and exclusive content.
        </p>
        <form className="signup__form" onSubmit={(e) => e.preventDefault()}>
          <div className="signup__input-wrapper">
            <input type="email" placeholder="Email" className="signup__input" required />
            <button type="submit" className="signup__button">Sign up</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignupSection;