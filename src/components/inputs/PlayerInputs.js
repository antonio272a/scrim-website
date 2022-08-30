import React, { useContext } from 'react'
import _ from 'lodash';
import context from '../../context/MyContext';
import PropTypes from 'prop-types';
import PlayerInputsText from '../../translations/components/inputs/PlayerInputs.json';

function PlayerInputs({ numberOfInputs, playerType, roles }) {
  const { playerInputs, setPlayerInputs, isEditing, language } = useContext(context);
  
  const text = PlayerInputsText[language];

  const inputs = _.range(1, numberOfInputs + 1)

  const playerInputChange = ({ target: {id, value} }) => {
    const key = id.slice(playerType.length).toLowerCase();
    if (key.indexOf('name') >= 0) {
      const playerNumber = Number(id.slice(-1)[0]);
      const roleElement = document.getElementById(`${playerType}Role${playerNumber}`)
      const hasName = Boolean(value)
      roleElement.required = hasName;
    }
    setPlayerInputs((prev) => ({...prev, [playerType]: {...prev[playerType], [key]: value}}))
  }

  return (
    <section className="container d-flex flex-wrap justify-content-around">
      {inputs.map((playerNumber) => (
        <div key={`${playerType}-player-${playerNumber}`} className="my-3 mx-3">
          <div className="form-floating">
            <input
              type="text"
              maxLength={25}
              className="form-control"
              id={`${playerType}Name${playerNumber}`}
              value={playerInputs[playerType][`name${playerNumber}`]}
              onChange={playerInputChange}
              disabled={!isEditing}
            />
            <label htmlFor={`${playerType}Name${playerNumber}`}>
              {text['player']} {playerNumber}
            </label>
          </div>
          <div>
            <select
              id={`${playerType}Role${playerNumber}`}
              className="form-select form-select-sm"
              onChange={playerInputChange}
              value={playerInputs[playerType][`role${playerNumber}`]}
              disabled={!isEditing}
            >
              <option value="" selected>
                {text['role']}
              </option>
              {roles.map((role, index) => (
                <option key={`${playerType}-role-${index}`} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </div>
        </div>
      ))}
    </section>
  );
}

PlayerInputs.propTypes = {
  numberOfInputs: PropTypes.number.isRequired,
  roles: PropTypes.arrayOf(PropTypes.string).isRequired,
  playerType: PropTypes.string.isRequired,
};

export default PlayerInputs;