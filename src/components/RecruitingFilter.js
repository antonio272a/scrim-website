import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select';
import { range } from 'lodash';

function RecruitingFilter({setTeams, teams}) {
  
  const [selectedVacancy, setSelectedVacancy] = useState(null);
  const [selectedRoles, setSelectedRoles] = useState([]);

  const VacancyOptions = range(1, 9).map((i) => ({
    label: i, value: i
  }))
  
  const roles = ["Mid Tank", "Off Tank", "Support", "Damage", "Flank", "Flex"];

  const rolesOptions = roles.map((role) => ({
    value: role,
    label: role,
  }));

  useEffect(() => {
    const filterByVacancyNumber = (teamsArray) => (
      teamsArray.filter((team) => (
        team.available_vacancy >= selectedVacancy.value
      ))
    )

    const filterByRoles = (teamsArray) => (
      teamsArray.filter((team) => selectedRoles.some(({ value }) => {
        const rolesArray = JSON.parse(team.recruiting_roles)

        if (!rolesArray.length) return true
        
        return rolesArray.some((role) => role.value === value); 
      })
     )
    );

    let filteredTeams = teams
    console.log(filteredTeams);
    if (selectedVacancy) {
      filteredTeams = filterByVacancyNumber(filteredTeams);
    }

    if (selectedRoles.length) {
      filteredTeams = filterByRoles(filteredTeams)
    }

    setTeams(filteredTeams)
  }, [selectedRoles, selectedVacancy, setTeams, teams])

  return (
    <section className='d-flex mt-5 align-items-center text-center'>
      <div className="w-50 mx-1">
        <label htmlFor="days-select" className="fw-bold fs-4 mb-2">
          Filtrar por quantidade de vagas
        </label>
        <Select
          className={"w-100"}
          id="vacancy-select"
          isClearable
          options={VacancyOptions}
          value={selectedVacancy}
          onChange={(vacancy) => {
            setSelectedVacancy(vacancy);
          }}
        />
      </div>
      <div className="w-50 mx-1">
        <label htmlFor="hours-select" className="fw-bold fs-4 mb-2">
          Filtrar por Roles
        </label>
        <Select
          className={"w-100"}
          id="hours-select"
          isMulti
          options={rolesOptions}
          value={selectedRoles}
          onChange={(roles) => {
            setSelectedRoles(roles);
          }}
        />
      </div>
    </section>
  );
}

RecruitingFilter.propTypes = {
  setTeams: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default RecruitingFilter;
