import { capitalize, range } from 'lodash';
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import context from '../../context/MyContext';
import { getScrimFromTeam } from '../../supabase/utils/scrimTimeUtils';

function TeamScrims() {
  const { user } = useContext(context);
  const { id } = useParams();
  
  const unselectedClass = "btn-outline-primary";
  const selectedClass = "btn-primary";
  const days = [
     "monday",
     "tuesday",
     "wednesday",
     "thursday",
     "friday",
     "saturday",
     "sunday",
  ];
  const times = range(0, 24);

  const dayTimesInitialState = {};
  days.forEach((day) => {
    dayTimesInitialState[day] = {};
    range(0, 24).forEach((key) => {
      dayTimesInitialState[day][key] = false;
    });
  });

  const [dayTimes, setDayTimes] = useState(dayTimesInitialState);
  const [selectedDay, setSelectedDay] = useState(0);

  useEffect(() => {
    const getTeamHours = async () => {
      const data = await getScrimFromTeam("paladins_teams_scrims", id);
      if (!data) return;
      const {
        monday,
        tuesday,
        wednesday,
        thursday,
        friday,
        saturday,
        sunday,
      } = data;
      setDayTimes({
        team_id: id,
        owner_id: user.id,
        monday: JSON.parse(monday),
        tuesday: JSON.parse(tuesday),
        wednesday: JSON.parse(wednesday),
        thursday: JSON.parse(thursday),
        friday: JSON.parse(friday),
        saturday: JSON.parse(saturday),
        sunday: JSON.parse(sunday),
      });
    };

    getTeamHours();
  }, [id, setDayTimes, user]);

  useEffect(() => {
    const dayButtons = [...document.getElementsByClassName("day-button")];
    dayButtons.forEach((button) => {
      button.classList.remove(selectedClass);
      button.classList.add(unselectedClass);
    });
    const selectedButton = dayButtons[selectedDay];
    selectedButton.classList.remove(unselectedClass);
    selectedButton.classList.add(selectedClass);
  }, [selectedDay]);

  const handleDayButton = ({ target }) => {
    const { id } = target;
    setSelectedDay(Number(id));
  };

  useEffect(() => {
    try {
      const firstDay = document.getElementById(days[0]);
      firstDay.classList.add(selectedClass);
      firstDay.classList.remove(unselectedClass);
    } catch (error) {}
  }, []);

  const daysButtons = days.map((day, index) => (
    <button
      className={`btn ${unselectedClass} mx-1 day-button btn-lg`}
      id={index}
      type="button"
      key={`button-${day}`}
      onClick={handleDayButton}
    >
      {capitalize(day)}
    </button>
  ));

    const daysAvailableTimes = days.map((day) => (
      <section
        key={`select-${day}`}
        className="d-flex flex-wrap justify-content-around w-50 mt-5"
      >
        {times.map((time) => (
          <div
            key={`${day}-${time}-checkbox`}
            className="m-4 btn-group"
            role="group"
          >
            <div className={`border border-primary py-2 px-3 rounded ${ dayTimes[day][time] ? 'btn-primary' :'nav-link'}`}>
              {time < 10 ? "0" : ""}
              {time} : 00H
            </div>
          </div>
        ))}
      </section>
    ));

  return (
    <section className="my-3 d-flex flex-column align-items-center container">
      <div className="mb-4 fs-3">Scrim hours:</div>
      <div className="d-flex justify-content-center">{daysButtons}</div>
      {daysAvailableTimes[selectedDay]}
    </section>
  );
}

export default TeamScrims