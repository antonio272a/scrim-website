import React, { useContext } from 'react'
import context from '../../context/MyContext';

function IsRecruitingInput() {
  const { 
    isRecruiting, 
    setIsRecruiting, 
    isEditing, 
    setAvailableRoles, 
    setAvailableVacancy 
  } = useContext(context);
  
  return (
    <div className="form-check">
      <input
        type="checkbox"
        className="form-check-input mb-4"
        checked={isRecruiting}
        disabled={!isEditing}
        onChange={({ target: { checked } }) => {
          setIsRecruiting(checked);
          if (!checked) {
            setAvailableVacancy(0);
            setAvailableRoles([]);
          }
        }}
      />
      <label className="form-check-label">Recrutando?</label>
    </div>
  );
}

export default IsRecruitingInput