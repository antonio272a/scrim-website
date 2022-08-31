import React, { useEffect, useState } from 'react'
import Header from '../components/Header';
import TeamCard from '../components/TeamCard';
import { getAllTeams } from '../supabase/utils/teamUtils';

function Teams() {
  
  const [teams, setTeams] = useState([]);


  useEffect(() => {
    const getTeams = async () => {
      const data = await getAllTeams('paladins_teams');
      setTeams(data)
    }
    getTeams();
  }, [])

  return (
    <div className='d-flex flex-column'>
      <Header />
      <section
        style={{height: '100vh'}}
        className={`
          d-flex container 
          flex-wrap justify-content-evenly mt-5 border
          p-3 border-secondary border-3 mx-3 
          align-items-start align-self-center`}
      >
        {teams.map(({ id, name, owner_id }) => (
          <TeamCard key={id} teamId={id} teamName={name} ownerId={owner_id} />
        ))}
      </section>
    </div>
  );
}

export default Teams;