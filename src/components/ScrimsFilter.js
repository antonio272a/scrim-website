import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Select from "react-select";
import { range } from "lodash";

function ScrimsFilter({ setTeams, teams }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [selectedHours, setSelectedHours] = useState([]);

  const daysSelectOptions = [
    { label: "Monday", value: "monday" },
    { label: "Tuesday", value: "tuesday" },
    { label: "Wednesday", value: "wednesday" },
    { label: "Thursday", value: "thursday" },
    { label: "Friday", value: "friday" },
    { label: "Saturday", value: "saturday" },
    { label: "Sunday", value: "sunday" },
  ];

  const hoursSelectOptions = range(0, 24).map((hour) => ({
    label: `${hour < 10 ? "0" : ""}${hour} : 00H`,
    value: hour,
  }));

  useEffect(() => {
    const filterTeamByDay = (teamsArray) => {
      const filtered = teamsArray.filter((team) =>
        selectedDays.some((day) => {
          const hourArray = Object.keys(
            JSON.parse(team.paladins_teams_scrims[0][day.value])
          );
          const availableOnDay = hourArray.some(
            (hour) => JSON.parse(team.paladins_teams_scrims[0][day.value])[hour]
          );
          return availableOnDay;
        })
      );
      return filtered;
    };

    const filterTeamByHour = (teamsArray) => {
      const filtered = teamsArray.filter((team) =>
        selectedHours.some((hour) => {
          const daysArray = Object.keys(team.paladins_teams_scrims[0]);
          return daysArray.some(
            (day) => JSON.parse(team.paladins_teams_scrims[0][day])[hour.value]
          );
        })
      );
      return filtered;
    };

    let filteredTeams = teams;
    if (selectedDays.length) {
      filteredTeams = filterTeamByDay(filteredTeams);
    }

    if (selectedHours.length) {
      filteredTeams = filterTeamByHour(filteredTeams);
    }
    console.log(filteredTeams);
    setTeams(filteredTeams);
  }, [selectedDays, selectedHours, setTeams, teams]);

  return (
    <section className="d-flex mt-5 align-items-center text-center">
      <div className="w-50 mx-1">
        <label htmlFor="days-select" className="fw-bold fs-4 mb-2">
          Filter by day
        </label>
        <Select
          className={"w-100"}
          id="days-select"
          isMulti
          options={daysSelectOptions}
          value={selectedDays}
          onChange={(days) => {
            setSelectedDays(days);
          }}
        />
      </div>
      <div className="w-50 x-1">
        <label htmlFor="hours-select" className="fw-bold fs-4 mb-2">
          Filter by hour (Time Zone: -3GMT)
        </label>
        <Select
          className={"w-100"}
          id="hours-select"
          isMulti
          options={hoursSelectOptions}
          value={selectedHours}
          onChange={(hours) => {
            setSelectedHours(hours);
          }}
        />
      </div>
    </section>
  );
}

ScrimsFilter.propTypes = {
  setTeams: PropTypes.func.isRequired,
  teams: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default ScrimsFilter;
