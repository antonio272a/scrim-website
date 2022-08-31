import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { getTeamLogo } from '../supabase/utils/logoUtils';
import defaultLogo from '../images/default-avatar.png';
import './css/teamCard.css';

function TeamCard({ teamId, teamName, ownerId, isLink }) {
  const [logoUrl, setLogoUrl] = useState('');
  
  useEffect(() => {
    const getLogo = async () => {
      const url = await getTeamLogo(ownerId, teamName);
      setLogoUrl(url);
    }
    getLogo();
  }, [ownerId, teamName]);

  const card = (
    <div
      className="d-flex flex-column align-items-center justify-content-start"
      style={{ position: "relative", height: '100%', width: "100%" }}
    >
      <img style={{height: "100%", width: "100%"}} src={logoUrl || defaultLogo} alt="Team Logo" />
      <span className="mt-1 teamName">{teamName}</span>
    </div>
  );

  return (
    <div style={{display: 'inline-block', height: "156px", width: "156px"}} className="text-center border border-secondary border-3 m-3 rounded">
      {isLink ? (<Link to={`/team/${teamId}`}>{card}</Link>) : (
        <div>{card}</div>
      )}
    </div>
  );
}

TeamCard.propTypes = {
  teamId: PropTypes.number.isRequired,
  teamName: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  isLink: PropTypes.bool,
};

TeamCard.defaultProps = {
  isLink: true
};

export default TeamCard