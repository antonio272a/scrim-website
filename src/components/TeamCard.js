import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getTeamLogo } from '../supabase/utils/logoUtils';
import defaultLogo from '../images/default-avatar.png';

function TeamCard({ teamId, teamName, ownerId }) {
  
  const [logoUrl, setLogoUrl] = useState('');

  useEffect(() => {
    const getLogo = async () => {
      const url = await getTeamLogo(ownerId, teamName);
      setLogoUrl(url);
    }
    getLogo();
  }, [ownerId, teamName]);

  return (
    <Link
      to={`/team/${teamId}`}
      className="text-center border border-secondary border-3 m-3 rounded"
    >
      <div className='d-flex flex-column align-items-center justify-content-start' style={{ position: 'relative' }}>
        <img
          width="150px"
          src={logoUrl || defaultLogo}
          alt="Team Logo"
        />
        <span style={{ position: 'absolute', bottom: "0px", color: 'black', height: 'auto' }} className="mt-1">{teamName}</span>
      </div>
    </Link>
  );
}

export default TeamCard