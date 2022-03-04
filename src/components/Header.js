import React, { useContext, useEffect, useState } from 'react'
import context from '../context/MyContext';
import defaultAvatar from '../images/default-avatar.png';
import { slide as Menu } from 'react-burger-menu';
import './css/burgerMenu.css'

function Header() {
  const {supabase, user} = useContext(context)
  const [userImage, setUserImage] = useState();
  

  useEffect(() => {
    try {
      setUserImage(user.identities[0].identity_data.avatar_url)
    } catch (error) {
    }
  }, [user]);

  const signOut = async() => {
    await supabase.auth.signOut(user.access_token)
    window.location.reload();
  }

  const signOutButton = <button className='btn btn-danger' type="button" onClick={signOut}>SignOut</button>

  return (
    <header className="header d-flex justify-content-around align-items-center">
      <Menu> 
        <a href='#root'>Suas Equipes</a>
        <a href='#root'>Equipes</a>
        <a href='#root'>Scrims</a>
      </Menu>

      <div>
        <img
        src={userImage || defaultAvatar}
        alt="user avatar"
        className="img-fluid img-thumbnail rounded-circle"
        style={{ width: "70px" }}
        />
      </div>
      {signOutButton}

      {/* <button
        type="button"
        onClick={() => {
          console.log(session);
        }}
      >
        Show Session
      </button>
      <button
        type="button"
        onClick={() => {
          console.log(user);
        }}
      >
        Show User
      </button>
      <button type="button" onClick={handleButton}>
        button
      </button> */}
    </header>
  );
  
}
  

export default Header;