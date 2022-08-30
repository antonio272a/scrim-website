import React, { useContext, useEffect, useState } from 'react'
import { getUserTeams } from '../../supabase/utils/teamUtils';
import { useParams } from 'react-router-dom';
import TeamCard from '../TeamCard';
import context from '../../context/MyContext';
import UserTeamsText from '../../translations/components/userPresentation/UserTeams.json';

function UserTeams() {
  const { userId } = useParams();
  const [teams, setTeams] = useState([]);
  const { language } = useContext(context);

  const text = UserTeamsText[language];

  useEffect(() => {
    const getTeams = async () => {
      const teamsData = await getUserTeams('paladins_teams', userId);
      setTeams(teamsData);
    } 

    getTeams();
  }, [userId]);

  return (
    <section className='mt-3 d-flex flex-column align-items-center'>
      <div className='fs-4'>{text['user-teams']}</div>

      <div className='d-flex flex-wrap align-items-center justify-content-around'>
        {teams.map(({ id, name }) => (
          <TeamCard
            key={`team-${id}`}
            teamId={id}
            teamName={name}
            ownerId={userId}
          />
        ))}
      </div>
    </section>
  );
}

export default UserTeams;
