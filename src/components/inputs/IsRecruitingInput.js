import React, { useContext } from 'react'
import context from '../../context/MyContext';
import isRecruitingInputText from '../../translations/components/inputs/IsRecruitingInput.json';

function IsRecruitingInput() {
  const { 
    isRecruiting, 
    setIsRecruiting, 
    isEditing, 
    setAvailableRoles, 
    setAvailableVacancy,
    language
  } = useContext(context);
  
  const text = isRecruitingInputText[language];

  return (
    <div className='form-check'>
      <input
        type='checkbox'
        className='form-check-input mb-4'
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
      <label className='form-check-label'>{text['recruiting']}</label>
    </div>
  );
}

export default IsRecruitingInput