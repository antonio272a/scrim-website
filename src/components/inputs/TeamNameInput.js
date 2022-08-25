import React, { useContext } from 'react'
import context from '../../context/MyContext';

function TeamNameInput () {
  const { teamName, setTeamName, isEditing } = useContext(context);
  
  const teamNameInputChange = ({ target: { value } }) => {
    setTeamName(value);
  };

  return (
    <div className="d-flex flex-column">
      <div className="form-floating mb-3">
        <input
          type="text"
          id="team-name"
          className="form-control"
          maxLength={25}
          value={teamName}
          onChange={teamNameInputChange}
          disabled={!isEditing}
          required
        />
        <label htmlFor="team-name">Team Name</label>
      </div>
      <span
        id="name-duplicate-error"
        className="invalid-feedback"
        style={{ display: "none" }}
      >
        Name already taken!
      </span>
    </div>
  );
}

export default TeamNameInput;