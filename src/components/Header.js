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

  return (
    <header className="header d-flex justify-content-around align-items-center">
      <Menu noOverlay> 
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
      <button className='btn btn-danger' type="button" onClick={signOut}>SignOut</button>
    </header>
  );
  
}
  

export default Header;