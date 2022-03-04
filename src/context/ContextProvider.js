import React, { useState, useEffect } from "react";
import supabase from "../supabase/supabaseClient";
import PropTypes from "prop-types";
import MyContext from "./MyContext";

function ContextProvider({ children }) {
  const [user, setUser] = useState();
  const [isEditing, setIsEditing] = useState(false);
  const [session, setSession] = useState();
  const [teamName, setTeamName] = useState("");
  const [teamAcronym, setTeamAcronym] = useState("");
  const [isRecruiting, setIsRecruiting] = useState(false);
  const [availableVacancy, setAvailableVacancy] = useState(0);
  const [oldName, setOldName] = useState();
  const [availableRoles, setAvailableRoles] = useState([]);
  const [logoImg, setLogoImg] = useState();
  const [logoUrl, setLogoUrl] = useState();
  const [isOwner, setIsOwner] = useState(false);
  const [hasAvatar, setHasAvatar] = useState(false);
  const [ownerId, setOwnerId] = useState();
  const [playerInputs, setPlayerInputs] = useState({
    main: {
      name1: "",
      role1: "",
      name2: "",
      role2: "",
      name3: "",
      role3: "",
      name4: "",
      role4: "",
      name5: "",
      role5: "",
    },
    subs: {
      name1: "",
      role1: "",
      name2: "",
      role2: "",
      name3: "",
      role3: "",
    },
  });

  useEffect(() => {
    setUser(supabase.auth.user())
  }, [session])

  const context = {
    supabase,
    user,
    setUser,
    session,
    setSession,
    playerInputs,
    setPlayerInputs,
    teamName,
    setTeamName,
    teamAcronym,
    setTeamAcronym,
    isEditing,
    setIsEditing,
    isRecruiting,
    setIsRecruiting,
    availableRoles,
    setAvailableRoles,
    availableVacancy,
    setAvailableVacancy,
    hasAvatar,
    setHasAvatar,
    oldName,
    setOldName,
    logoImg,
    setLogoImg,
    logoUrl,
    setLogoUrl,
    ownerId,
    setOwnerId,
    isOwner,
    setIsOwner
  };
  return <MyContext.Provider value={context}>{children}</MyContext.Provider>;
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
