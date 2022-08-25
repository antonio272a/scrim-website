import React, { useContext, useEffect } from "react";
import { Route, Routes, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import CreateTeam from "./pages/CreateTeam";
import TeamEdit from "./pages/TeamEdit";
import Login from "./pages/Login";
import MyContext from "./context/MyContext";
import supabase from "./supabase/supabaseClient";
import Teams from "./pages/Teams";
import Team from "./pages/Team";
import Scrims from "./pages/Scrims";
import Recruiting from "./pages/Recruiting";
import UserTeams from "./pages/UserTeams";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
  const { session, setSession } = useContext(MyContext);
  
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession])

  return (
    <div className="bg-body">
      {session ? (
        <Routes>
          <Route path="/team/:id/edit" element={<TeamEdit />} />
          <Route path="/team/:id" element={<Team />} />
          <Route path="/create-team" element={<CreateTeam />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/scrims" element={<Scrims />} />
          <Route path="/recruit" element={<Recruiting />} />
          <Route path="/user-teams" element={<UserTeams />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="/" element={<Teams />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;
