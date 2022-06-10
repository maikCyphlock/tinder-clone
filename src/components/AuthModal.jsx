import { useState } from "react";
import axios from 'axios'

import {useNavigate} from 'react-router-dom'
import {useCookies}  from'react-cookie'

function AuthModal({ setShowModal, setIsSignup, isSignup, isOpen }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [error, setError] = useState(null);
  const [cookie,setCookie,RemoveCookie] = useCookies(null)
  console.log(email, password, confirmPassword, isOpen);

  const handlerClick = () => {
    setShowModal(false);
  };

 const HandlerSubmit = async (e) => {
        e.preventDefault()

        try {
            if (isSignup && (password !== confirmPassword)) {
                setError('Passwords need to match!')
                return
            }

            const response = await axios.post(`http://localhost:8080/${isSignup ? 'signup' : 'login'}`, { email, password })

            setCookie('AuthToken', response.data.token)
            setCookie('UserId', response.data.userId)

            const success = response.status === 201
            if (success && isSignup) navigate ('/onboarding')
            if (success && !isSignup) navigate ('/dashboard')
            window.location.reload();

        } catch (error) {
            console.log(error)
        }

    }

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
      <form onSubmit={HandlerSubmit}>
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
