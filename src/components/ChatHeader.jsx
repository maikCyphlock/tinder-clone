import React from 'react'
import { useCookies} from 'react-cookie'

function ChatHeader({user}) {
  const [cookies, removeCookies] = useCookies(['user'])
  const logOut = () => {
    removeCookies('UserId', cookies.UserId);
    removeCookies('AuthToken', cookies.AuthToken);
    window.location.reload();
  }
  return (
    <>
    {
      user && <div className='chat-container-header'>
      <div className="profile">
           <div className="img-container">
           <img src={user.url} className="avatar"/>
           </div>
           <h3>{user.first_name}</h3>
      </div>
      <i className='log-out-icon' onClick={logOut}>0</i>
   </div>
    }
    </>
  )
}

export default ChatHeader