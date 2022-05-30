import { useState } from "react";

function AuthModal({ setShowModal, setIsSignup, isSignup, isOpen }) {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);

  console.log(email, password, confirmPassword, isOpen);
  const handlerClick = () => {
    setShowModal(false);
  };
  const handlerSubmit = (e) => {
    e.preventDefault();
    try {
      if (isSignup && password !== confirmPassword) {
        setError("Passwords do not match");
      }
      console.log("make a post request to our database");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <dialog open className="auth-modal">
      <div className="close-icon" onClick={handlerClick}>
        X
      </div>
      <h2>{isSignup ? "Create account" : "Log in"}</h2>
      <p>
        By clicking Log In, you agree to our terms. Learn how we process your
        data in our Privacy Policy and Cookie Policy.
      </p>
      <form onSubmit={handlerSubmit}>
        <input
          type="email"
          name="email"
          required={true}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email"
        />
        <input
          type="password"
          name="password"
          required={true}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
        />
        {isSignup && (
          <input
            type="password"
            name="password-check"
            required={true}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="confirm password"
          />
        )}
        <input className="secondary-button" type="submit" />
        <p>{error}</p>
      </form>
      <hr />
      <h2>GET THE APP</h2>
    </dialog>
  );
}

export default AuthModal;
