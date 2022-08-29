import React, { useContext, useEffect, useState } from 'react'
import _ from "lodash";
import PropTypes from 'prop-types';
import context from '../context/MyContext';
import { getScrimFromTeam, upsertScrim } from '../supabase/utils/scrimTimeUtils';
import TeamScrimMenuText from '../translations/components/TeamScrimMenu.json';

function TeamScrimMenu({ teamId }) {
  const { user, language } = useContext(context);
  const [selectedDay, setSelectedDay] = useState(0);

  const text = TeamScrimMenuText[language];
  const { days: daysText } = text;

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ]

  const dayTimesInitialState = {}
  days.forEach((day) => {
    dayTimesInitialState[day] = {}
    _.range(0, 24).forEach((key) => {dayTimesInitialState[day][key] = false})
  })
  

  const [dayTimes, setDayTimes] = useState(dayTimesInitialState);

  useEffect(() => {
    const getTeamHours = async () => {
      const data = await getScrimFromTeam("paladins_teams_scrims", teamId);
      if (!data) return;
      const { monday, tuesday, wednesday, thursday, friday, saturday, sunday } = data;
      setDayTimes({
        team_id: teamId, 
        owner_id: user.id,
        monday: JSON.parse(monday),
        tuesday: JSON.parse(tuesday),
        wednesday: JSON.parse(wednesday),
        thursday: JSON.parse(thursday),
        friday: JSON.parse(friday),
        saturday: JSON.parse(saturday),
        sunday: JSON.parse(sunday),
      })
    };

    getTeamHours();
  }, [teamId, setDayTimes, user]);

  const times = _.range(0,24);

  const handleHourButton = ({ target }) => {
    const { id, checked } = target;
    const [day, index] = id.split('-');
    setDayTimes((prev) => ({...prev, [day]: {...prev[day], [Number(index)]: checked} }));
  };
  
  const daysAvailableTimes = days.map((day) => (
    <section
      key={`select-${day}`}
      className="d-flex flex-wrap justify-content-around w-50 mt-5"
    >
      {times.map((time) => (
        <div key={`${day}-${time}-checkbox`} className="m-4 btn-group" role="group">
          <input
            type="checkbox"
            id={`${day}-${time}`}
            value={time}
            className="btn-check"
            checked={dayTimes[day][time]}
            onChange={handleHourButton}
          />
          <label htmlFor={`${day}-${time}`} className="btn btn-outline-primary">
            {time < 10 ? "0" : ""}
            {time} : 00H
          </label>
        </div>
      ))}
    </section>
  ));

  const unselectedClass = "btn-outline-primary";
  const selectedClass = "btn-primary";

  useEffect(() => {
    const dayButtons = [...document.getElementsByClassName("day-button")];
    dayButtons.forEach((button) => {
      button.classList.remove(selectedClass);
      button.classList.add(unselectedClass);
    });
    const selectedButton = dayButtons[selectedDay]
    selectedButton.classList.remove(unselectedClass);
    selectedButton.classList.add(selectedClass);
  }, [selectedDay])

  const handleDayButton = ({ target }) => {
    const {id} = target
    setSelectedDay(Number(id));
  }
  
  useEffect(() => {
    try {
      const firstDay = document.getElementById(days[0]);
      firstDay.classList.add(selectedClass);
      firstDay.classList.remove(unselectedClass);
    } catch (error) {
    }
  }, []);

  const saveHours = async (e) => {
    e.preventDefault();
    
    const {monday, tuesday, wednesday, thursday, friday, saturday, sunday } = dayTimes;
    
    const body = {
      team_id: teamId,
      owner_id: user.id,
      monday: JSON.stringify(monday),
      tuesday: JSON.stringify(tuesday),
      wednesday: JSON.stringify(wednesday),
      thursday: JSON.stringify(thursday),
      friday: JSON.stringify(friday),
      saturday: JSON.stringify(saturday),
      sunday: JSON.stringify(sunday),
    };

    await upsertScrim("paladins_teams_scrims", body);

    window.location.reload();
  } 

  const daysButtons = days.map((day, index) => (
    <button
      className={`btn ${unselectedClass} mx-1 day-button btn-lg`}
      id={index}
      type='button'
      key={`button-${day}`}
      onClick={handleDayButton}
    >
      {daysText[day]}
    </button>
  ));

  useEffect(() => {
    
  }, []);

  return (
    <form className="mt-4 d-flex flex-column container align-items-center">
      <h3 className='mb-3'>{text['timezone']}</h3>
      <section className="container d-flex justify-content-around w-50">
        {daysButtons}
      </section>
      {daysAvailableTimes[selectedDay]}
      <button
        type="submit"
        onClick={saveHours}
        className="btn btn-success mt-4 btn-lg"
      >
        {text['save']}
      </button>
    </form>
  );

}

TeamScrimMenu.propTypes = {
  teamId: PropTypes.string.isRequired,
}

export default TeamScrimMenu;