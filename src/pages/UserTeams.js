import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header'
import TeamCard from '../components/TeamCard'
import context from '../context/MyContext';
import { getUserTeams } from '../supabase/utils/teamUtils';
import UserTeamsText from '../translations/pages/UserTeams.json';

function UserTeams() {
  
  const { user, language } = useContext(context);
  const [teams, setTeams] = useState([]);
  
  const text = UserTeamsText[language];

  useEffect(() => {
    const getTeams = async () => {
      const data = await getUserTeams('paladins_teams', user.id);
      setTeams(data);
      console.log(data);
    }
    getTeams();
  }, [user.id])

  return (
    <div className="d-flex flex-column">
      <Header />
      <section className="position-relative align-items-center d-flex justify-content-center container fs-3 w-100 border border-2 border-dark rounded p-2 text-center mt-3">
        <p className="fw-bolder m-0">{text['your-teams']}</p>
        <Link className='position-absolute mx-3 btn btn-primary' style={{right: "0px", top:"50%", transform: "translateY(-50%)"}} to="/create-team">{text['create-team']}</Link>
      </section>
      <section
        style={{ height: "100vh" }}
        className={`
          d-flex container 
          flex-wrap justify-content-evenly mt-5 border
          p-3 border-secondary border-3 mx-3 
          align-items-start align-self-center`}
      >
        {teams.map(({ id, name, owner_id }) => (
          <TeamCard teamId={id} teamName={name} ownerId={owner_id} />
        ))}
      </section>
    </div>
  );
}

export default UserTeams