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
import Scrims from "./pages/Scrims";
import Recruiting from "./pages/Recruiting";
import UserTeams from "./pages/UserTeams";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import System from "./pages/System";
import Riot from "./pages/Riot";

function App() {
  const { session, setSession } = useContext(MyContext);
  
  useEffect(() => {
    setSession(supabase.auth.session());
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [setSession])

  useEffect(() => {
    document.title = 'Scrims Website'
  }, [])
  console.log(window.location.href.endsWith('riot.txt'));
  return (
    <div className="bg-body">
      {session || window.location.href.endsWith('riot.txt') ? (
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
          <Route path="/system" element={<System />} />
          <Route path="/home" element={<Home />} />
          <Route path="/riot.txt" element={<Riot />} />
          <Route path="/" element={<Index />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Login />
        )}
        <Footer />
    </div>
  );
}

export default App;
