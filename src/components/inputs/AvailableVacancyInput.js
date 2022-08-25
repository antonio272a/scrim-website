import React, { useContext } from 'react'
import context from '../../context/MyContext';

function AvailableVacancyInput() {
  const { 
    availableVacancy, 
    isEditing, 
    isRecruiting, 
    setAvailableVacancy, 
    setAvaliableRoles 
  } = useContext(context);
  
  const handleVacancyChange = ({ target: { value } }) => {
    setAvailableVacancy(value);
    if (!Number(value)) {
      setAvaliableRoles([]);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <label htmlFor="avaliable-vacancy" className="form-label">
        Available vacancies
      </label>
      <select
        id="avaliable-vacancy"
        max={8}
        value={availableVacancy}
        onChange={handleVacancyChange}
        style={{ minWidth: "120px" }}
        disabled={!isEditing || !isRecruiting}
        required
      >
        <option value={""} selected>
          0
        </option>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default AvailableVacancyInput