import React from 'react'
import supabase from '../supabase/supabaseClient';

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

  const signInButton = (
    <button type="button" onClick={signInDiscord}>
      Login
    </button>
  );

  return <div>{signInButton}</div>
}

export default Login;