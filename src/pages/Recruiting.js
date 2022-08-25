import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import RecruitingFilter from '../components/RecruitingFilter'
import TeamCard from '../components/TeamCard';
import { getAllRecruitingTeams } from "../supabase/utils/teamUtils";

function Recruiting() {
  
  const [FilteredTeams, setFilteredTeams] = useState([]);
  const [teamsReference, setTeamsReference] = useState([]);

  useEffect(() => {
    const getTeams = async () => {
      const data = await getAllRecruitingTeams("paladins_teams");
      console.log(data);
      setFilteredTeams(data);
      setTeamsReference(data);
    };

    getTeams();
  }, []);
  
  return (
    <div>
      <Header />
      <main className="container d-flex flex-column text-center mt-3">
        <div className="fw-bolder fs-3 w-100 border border-2 border-dark rounded p-2 ">
          SEARCH FOR VACANCIES
        </div>
        <RecruitingFilter teams={teamsReference} setTeams={setFilteredTeams} />
        <section
          style={{ height: "100vh" }}
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

export default Recruiting