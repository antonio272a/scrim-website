import React from 'react'
import LanguageSelector from './LanguageSelector'

function Footer() {
  return (
    <footer className='d-flex justify-content-around align-items-center align-content-center bg-light py-4 footer'>
      <a
        href='https://discord.gg/r3q59gtQmYhttps://discord.gg/r3q59gtQmY'
        className='m-0'
      >
        Discord
      </a>
      <p className='align-self-center m-0'>By Antonio272</p>
      <LanguageSelector />
    </footer>
  );
}

export default Footer