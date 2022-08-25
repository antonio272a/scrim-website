import React, { useContext } from 'react'
import PropTypes from 'prop-types';
import Select from 'react-select';
import context from '../../context/MyContext';

function RolesSelectInputs({ roles }) {
  
  const {availableRoles, setAvailableRoles, availableVacancy, isEditing} = useContext(context);

  const multiSelectOption = roles.map((role) => ({
    value: role,
    label: role,
  }));

  return (
    <div className="d-flex flex-column align-items-center">
      <label htmlFor="roles-select">Available Roles</label>
      <Select
        id="roles-select"
        width="100px"
        isMulti
        options={multiSelectOption}
        value={availableRoles}
        isDisabled={!Boolean(Number(availableVacancy)) || !isEditing}
        onChange={(roles) => {
          setAvailableRoles(roles);
        }}
      />
    </div>
  );
}

RolesSelectInputs.propTypes = {
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default RolesSelectInputs