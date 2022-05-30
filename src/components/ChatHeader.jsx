import React from 'react'

function ChatHeader() {
  return (
    <div className='chat-container-header'>
       <div className="profile">
            <div className="img-container">
            {/* <img src="https://www.w3schools.com/howto/img_avatar.png" alt="Avatar" className="avatar"/> */}
            </div>
            <h3>UserName</h3>
       </div>
       <i className='log-out-icon'>0</i>
    </div>
  )
}

export default ChatHeader