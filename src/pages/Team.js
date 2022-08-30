import React, { useContext, useEffect, useCallback, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Contact from '../components/teamPresentation/Contact';
import Header from '../components/Header';
import context from '../context/MyContext';
import { getTeamLogo } from '../supabase/utils/logoUtils';
import { getTeamById } from '../supabase/utils/teamUtils';
import TeamName from '../components/teamPresentation/TeamName';
import TeamPlayers from '../components/teamPresentation/TeamPlayers';
import TeamAvailableVacancys from '../components/teamPresentation/TeamAvailableVacancies';
import TeamScrims from '../components/teamPresentation/TeamScrims';
import TeamLogo from '../components/teamPresentation/TeamLogo';
import { getUserById } from '../supabase/utils/userUtils';
import TeamText from '../translations/pages/Team.json';

function Team() {
  const { id } = useParams()
  const navigate = useNavigate();
  const {
    user,
    setPlayerInputs,
    setTeamName,
    setTeamAcronym,
    setIsRecruiting,
    setAvailableRoles,
    setAvailableVacancy,
    setHasAvatar,
    setLogoUrl,
    setIsOwner,
    isOwner,
    setOwnerId,
    ownerId,
    setIsEditing,
    language
  } = useContext(context);

  const [discordName, setDiscordName] = useState('');
  const [ownerAvatar, setOwnerAvatar] = useState('');

  const text = TeamText[language]; 

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
      const data = await getTeamById(id, "paladins_teams");
      if (!data) return navigate("/not-found");
      memorizedRenderTeam(data);
    };

    const getUser = async () => {
      if(!ownerId) return
      const { name, avatar_url } = await getUserById(ownerId);
      setDiscordName(name);
      setOwnerAvatar(avatar_url);
    };
    getUser();

    getTeam();
  }, [id, navigate, memorizedRenderTeam, ownerId]);
  
  useEffect(() => {
    if (!user) return;
    const isUserOwner = ownerId === user.id;
    setIsOwner(isUserOwner);
  }, [ownerId, setIsOwner, user]);

  return (
    <div style={{ minHeight: '2000px' }}>
      <Header />
      <main className='d-flex flex-column'>
        <Contact
          discord={discordName}
          ownerId={ownerId}
          discordAvatar={ownerAvatar}
        />
        <TeamLogo />
        {isOwner && (
          <div className='mt-3 align-self-center'>
            <Link to={`/team/${id}/edit`} className='btn btn-primary'>
              {text['edit-team']}
            </Link>
          </div>
        )}
        <TeamName />
        <hr className='w-100 border-top border-dark border-3' />
        <TeamPlayers playerType='main' playerNumbers={5} />
        <TeamPlayers playerType='subs' playerNumbers={3} />
        <TeamAvailableVacancys />
        <hr className='w-100 border-top border-dark border-3' />
        <TeamScrims />
      </main>
    </div>
  );
}

export default Team