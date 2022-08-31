import React, { useContext } from 'react'
import context from '../../context/MyContext'
import defaultLogo from '../../images/default-avatar.png'

function TeamLogo() {
  const { logoUrl } = useContext(context);

  return (
    <div className="align-self-center d-flex mt-3">
      <img
        className="img-fluid img-thumbnail align-self-center rounded"
        src={logoUrl || defaultLogo}
        alt="Team Logo"
        style={{ width: "100px", height: "100px" }}
      />
    </div>
  );
}

export default TeamLogo