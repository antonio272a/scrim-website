import React, {useContext, useEffect, useState} from 'react'
import Header from '../components/Header'
import ScrimsFilter from '../components/ScrimsFilter';
import TeamCard from '../components/TeamCard';
import context from '../context/MyContext';
import { getAllTeamsWithScrim } from '../supabase/utils/scrimTimeUtils';
import ScrimsText from '../translations/pages/Scrims.json';

function Scrims() {
  
  const { language } = useContext(context);
  const [FilteredTeams, setFilteredTeams] = useState([]);
  const [teamsReference, setTeamsReference] = useState([]);
  
  const text = ScrimsText[language];

  useEffect(() => {
    const getTeams = async () => {
      const data = await getAllTeamsWithScrim("paladins_teams");
      setFilteredTeams(data);
      setTeamsReference(data);
    };

    getTeams();
  }, []);
  
  return (
    <div>
      <Header />
      <main className='container d-flex flex-column text-center mt-5'>
        <div className='fw-bolder fs-3 w-100 border border-2 border-dark rounded p-2 '>
          {text['search-scrim']}
        </div>
        <ScrimsFilter teams={teamsReference} setTeams={setFilteredTeams} />
        <section
          style={{ height: '100vh' }}
          className={`
            d-flex container 
            flex-wrap justify-content-evenly mt-5 border
            p-3 border-secondary border-3 mx-3 
            align-items-start align-self-center`}
        >
          {FilteredTeams.map(({ id, name, owner_id }) => (
            <TeamCard
              key={`team-${name}`}
              teamId={id}
              teamName={name}
              ownerId={owner_id}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default Scrims