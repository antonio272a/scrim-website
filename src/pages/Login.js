import React from 'react'
import supabase from '../supabase/supabaseClient';
import './css/login.css';

function Login() {
  const signInDiscord = async () => {
    try {
      await supabase.auth.signIn(
        { provider: "discord" },
        { shouldCreateUser: true }
      );
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='login-bg'>
      <button 
        className='btn btn-light btn-lg login-btn' 
        type="button" 
        onClick={ signInDiscord }
      >
        Login
      </button>
    </div>
  );
}

export default Login;