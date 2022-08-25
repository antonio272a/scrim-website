import React, { useContext } from 'react'
import context from '../../context/MyContext'

function TeamAvailableVacancys() {
  const { isRecruiting, availableVacancy, availableRoles } = useContext(context);
  
  const notRecruiting = (
    <p className="fs-4 text-center">This team is currently not recruiting.</p>
  );

    const recruiting = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="fs-4">Available vacancies: {availableVacancy}</p>
        <div className="d-flex align-items-center align-center">
          <div className="fs-3 me-3">Roles:</div>
          {availableRoles.length ? (
            availableRoles.map((role, index) => (
              <div
                key={`available-${index}`}
                className="fs-5 border border-dark border-2 p-2 mx-2 rounded-pill"
              >
                {role.label}
              </div>
            ))
          ) : (
            <div className="fs-5 border border-dark border-2 p-2 mx-2 rounded-pill">
              Any
            </div>
          )}
        </div>
      </div>
    );

  return (
    <section>
      {(!isRecruiting || !availableVacancy) ? notRecruiting : recruiting}
    </section>
  )
}

export default TeamAvailableVacancys