import ColorLogo from "../image/color-logo-tinder.png";
import WhiteLogo from "../image/tinder_logo_white.png";
function Nav({ minimal, authToken,setShowModal,showModal,setIsSignup }) {

  const handleClick = () => {
    setShowModal(true);
    setIsSignup(false)
  }
  authToken=true
  return (
    <nav className="nav">
      <div className="logo-container">
        <img src={!minimal ? WhiteLogo : ColorLogo} alt="log" className="logo" />
      </div>
      {!authToken && !minimal && <button className="nav-button" onClick={handleClick} disabled={showModal}>log in</button>}
    </nav>
  );
}

export default Nav;
