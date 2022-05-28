import { useState } from "react";
import Nav from "../components/Nav";
import AuthModal from "../components/authModal";

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(true);
  const authToken = false;
  const handlerClick = () => {
    console.log("clicked");
    setShowModal(true);
    setIsSignup(true)
  };
  return (
    <div className="overlay">
      <Nav
        minimal={false}
        authToken={authToken}
        setShowModal={setShowModal}
        showModal={showModal}
        setIsSignup={setIsSignup}
      />
      <div className="home">
        
        <h1 className="primary-title">Swipe Right &copy;</h1>
        <button className="primary-button" onClick={handlerClick}>
          {authToken ? "Sign Out" : "Create Account"}
        </button>
        {showModal && <AuthModal open={true} setShowModal={setShowModal} setIsSignup={setIsSignup} isSignup={isSignup} />}
      </div>
    </div>
  );
}

export default Home;
