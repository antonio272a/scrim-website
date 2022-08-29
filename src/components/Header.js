import React, { useContext, useEffect, useState } from 'react'
import context from '../context/MyContext';
import defaultAvatar from '../images/default-avatar.png';
import { slide as Menu } from 'react-burger-menu';
import './css/burgerMenu.css'
import { Link } from 'react-router-dom';
import HeaderText from '../translations/components/Header.json';

function Header() {
  const {supabase, user, language} = useContext(context)
  const [userImage, setUserImage] = useState();
  
  const text = HeaderText[language];

  const userId = user ? user.id : '';

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

  const menuHandler = ({ isOpen }) => {
    const burgerButton = document.querySelector(".bm-burger-button");

    if (isOpen) {
      return burgerButton.classList.add('invisible')
    }
    return burgerButton.classList.remove('invisible')
  }

  return (
    <header className='header d-flex justify-content-around align-items-center pt-3'>
      <Menu noOverlay onStateChange={menuHandler}>
        <div className='d-flex flex-column'>
          <Link className='btn btn-primary my-2' to='/home'>
            {text['home']}
          </Link>
          <Link className='btn btn-primary my-2' to='/teams'>
            {text['teams']}
          </Link>
          <Link className='btn btn-primary my-2' to='/scrims'>
            {text['scrims']}
          </Link>
          <Link className='btn btn-primary my-2' to='/recruit'>
            {text['find-teams']}
          </Link>
          <Link className='btn btn-primary my-2' to={`/user-teams`}>
            {text['your-teams']}
          </Link>
          <Link className='btn btn-primary my-2' to={`/profile/${userId}`}>
            {text['profile']}
          </Link>
        </div>
      </Menu>

      <div>
        <img
          src={userImage || defaultAvatar}
          alt='user avatar'
          className='img-fluid img-thumbnail rounded-circle'
          style={{ width: '70px' }}
        />
      </div>
      <button className='btn btn-danger' type='button' onClick={signOut}>
        {text['signout']}
      </button>
    </header>
  );
  
}
  

export default Header;