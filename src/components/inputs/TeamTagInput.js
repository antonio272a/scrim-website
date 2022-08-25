import React, { useContext } from 'react'
import context from '../../context/MyContext';

function TeamTagInput() {

  const { teamAcronym, setTeamAcronym, isEditing } = useContext(context);
  
  const teamAcronymInputChange = ({ target: { value } }) => {
    setTeamAcronym(value.toUpperCase());
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <div className="form-floating mb-3">
        <input
          id="team-acronym"
          type="text"
          maxLength={3}
          className="form-control"
          value={teamAcronym}
          disabled={!isEditing}
          onChange={teamAcronymInputChange}
          required
        />
        <label htmlFor="acronym-input">Team Tag</label>
      </div>
      <span
        id="acronym-duplicate-error"
        className="invalid-feedback"
        style={{ display: "none" }}
      >
        Tag already taken
      </span>
    </div>
  );
}

export default TeamTagInput;
