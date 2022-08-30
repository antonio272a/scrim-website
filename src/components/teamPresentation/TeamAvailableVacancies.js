import React, { useContext } from 'react'
import context from '../../context/MyContext'
import TeamAvailableVacanciesText from '../../translations/components/teamPresentation/TeamAvailableVacancies.json';

function TeamAvailableVacancies() {
  const { isRecruiting, availableVacancy, availableRoles, language } = useContext(context);
  
  const text = TeamAvailableVacanciesText[language];

  const notRecruiting = (
    <p className="fs-4 text-center">{text['not-recruiting']}</p>
  );

    const recruiting = (
      <div className="d-flex flex-column justify-content-center align-items-center">
        <p className="fs-4">{text['available-vacancies']} {availableVacancy}</p>
        <div className="d-flex align-items-center align-center">
          <div className="fs-3 me-3">{text['roles']}</div>
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
              {text['any']}
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

export default TeamAvailableVacancies