import "./App.css";
import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTeam from "./pages/CreateTeam";
import TeamEdit from "./pages/TeamEdit";
import Login from "./pages/Login";
import MyContext from "./context/MyContext";
import supabase from "./supabase/supabaseClient";
import Teams from "./pages/Teams";
import Team from "./pages/Team";

function App() {
  const { session, setSession } = useContext(MyContext);
  
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession])

  return (
    <div>
      {session ? (
        <Routes>
          <Route path="/team/:id/edit" element={<TeamEdit />} />
          <Route path="/team/:id" element={<Team />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/" element={<Teams />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
