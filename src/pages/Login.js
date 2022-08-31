import React, { useContext } from 'react';
import context from '../context/MyContext';
import supabase from '../supabase/supabaseClient';
import './css/login.css';
import LoginText from '../translations/pages/Login.json';

function Login() {
  const { language } = useContext(context);
  
  const text = LoginText[language];

  const signInDiscord = async () => {
    try {
      await supabase.auth.signIn(
        { provider: 'discord' },
        { shouldCreateUser: true }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='login-bg text-center px-5'>
      <header className='pt-4'>
        <h1>{text['title']}</h1>
      </header>
      <section className='mt-5'>
        <p>{text['main-text']}</p>
        <p>
          {text['suggestions-text']}
          <a
            href='https://discord.gg/r3q59gtQmYhttps://discord.gg/r3q59gtQmY'
            target='_blank'
            rel='noreferrer'
          >
            Discord
          </a>
        </p>
      </section>
      <div>
        <button
          className='btn btn-light btn-lg login-btn'
          type='button'
          onClick={signInDiscord}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;
