import React, { useContext } from 'react'
import context from '../../context/MyContext';
import TeamTagInputText from '../../translations/components/inputs/TeamTagInput.json';

function TeamTagInput() {
  const { teamAcronym, setTeamAcronym, isEditing, language } = useContext(context);
  
  const text = TeamTagInputText[language];

  const teamAcronymInputChange = ({ target: { value } }) => {
    setTeamAcronym(value.toUpperCase());
  };

  return (
    <div className='d-flex flex-column align-items-center'>
      <div className='form-floating mb-3'>
        <input
          id='team-acronym'
          type='text'
          maxLength={3}
          className='form-control'
          value={teamAcronym}
          disabled={!isEditing}
          onChange={teamAcronymInputChange}
          required
        />
        <label htmlFor='acronym-input'>{text['team-tag']}</label>
      </div>
      <span
        id='acronym-duplicate-error'
        className='invalid-feedback'
        style={{ display: 'none' }}
      >
        {text['already-taken']}
      </span>
    </div>
  );
}

export default TeamTagInput;
