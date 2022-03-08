import React, { useContext } from 'react'
import context from '../../context/MyContext';

function TeamName() {
  const {teamName, teamAcronym} = useContext(context);

  return (
    <section className="d-flex justify-content-around w-50 align-self-center my-4 text-center">
      <p className="border border-dark btn-lg flex-fill mx-4">{teamName}</p>
      <p className="border border-dark btn-lg">{teamAcronym}</p>
    </section>
  );
}

export default TeamName