import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { getUserTeams } from '../../supabase/utils/teamUtils';
import { useParams } from 'react-router-dom';
import TeamCard from '../TeamCard';

function UserTeams() {
  const { userId } = useParams();
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      const teamsData = await getUserTeams('paladins_teams', userId);
      setTeams(teamsData);
    } 

    getTeams();
  }, [userId]);

  return (
    <section className='mt-3 d-flex flex-column align-items-center'>
      <div className='fs-4'>Times do usuário</div>
      <div className='d-flex flex-wrap align-items-center justify-content-around'>
      {teams.map(({ id, name }) => (
        <TeamCard key={`team-${id}`} teamId={id} teamName={name} ownerId={userId} />
        ))}
      </div>
    </section>
  )
}

export default UserTeams;
