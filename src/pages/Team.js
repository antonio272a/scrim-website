import React, { useContext, useEffect, useCallback, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Contact from '../components/Contact';
import Header from '../components/Header';
import context from '../context/MyContext';
import { getTeamLogo } from '../supabase/utils/logoUtils';
import { getTeamById } from '../supabase/utils/teamUtils';

function Team() {
  const {id} = useParams()
  const navigate = useNavigate();
  const {
    user,
    playerInputs,
    setPlayerInputs,
    teamName,
    setTeamName,
    teamAcronym,
    setTeamAcronym,
    isRecruiting,
    setIsRecruiting,
    availableRoles,
    setAvailableRoles,
    availableVacancy,
    setAvailableVacancy,
    hasAvatar,
    setHasAvatar,
    setLogoUrl,
    setIsOwner,
    isOwner,
    setOwnerId,
    ownerId,
    setIsEditing,
  } = useContext(context);

  const [discordName, setDiscordName] = useState('');
  const [discordId, setDiscordId] = useState('');
  const [ownerAvatar, setOwnerAvatar] = useState('');


  const renderTeam = (team) => {
    const {
      name,
      owner_id,
      acronym,
      players,
      subs,
      is_recruiting,
      recruiting_roles,
      available_vacancy,
      owner_discord,
      owner_discord_id,
      owner_avatar,
    } = team;

    const renderLogo = async () => {
      const resultLogoUrl = await getTeamLogo(owner_id, name);
      if (!resultLogoUrl) return setHasAvatar(false);
      setLogoUrl(resultLogoUrl);
      setHasAvatar(true);
    };

    setTeamName(name);
    setOwnerId(owner_id);
    setTeamAcronym(acronym);
    setPlayerInputs({ main: JSON.parse(players), subs: JSON.parse(subs) });
    setIsRecruiting(is_recruiting);
    setAvailableRoles(JSON.parse(recruiting_roles));
    setAvailableVacancy(available_vacancy);
    setDiscordName(owner_discord);
    setDiscordId(owner_discord_id);
    setOwnerAvatar(owner_avatar);
    renderLogo();
    setIsEditing(false);
  };

  const memorizedRenderTeam = useCallback(renderTeam, [
    setAvailableRoles,
    setAvailableVacancy,
    setHasAvatar,
    setIsEditing,
    setIsRecruiting,
    setLogoUrl,
    setOwnerId,
    setPlayerInputs,
    setTeamAcronym,
    setTeamName,
  ]);

  useEffect(() => {
    const getTeam = async () => {
      const data = await getTeamById(id, "paladins-teams");
      if (!data) return navigate("/not-found");
      memorizedRenderTeam(data);
    };
    getTeam();
  }, [id, navigate, memorizedRenderTeam]);
  
  useEffect(() => {
    if (!user) return;
    const isUserOwner = ownerId === user.id;
    setIsOwner(isUserOwner);
  }, [ownerId, setIsOwner, user]);

  return (
    <div style={{minHeight: "2000px"}}>
      <Header />
      <main>
        <Contact discord={discordName} discordId={discordId} discordAvatar={ownerAvatar} />
      </main>
    </div>
  )
}

export default Team