import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { filter, range } from 'lodash'
import context from '../../context/MyContext';

function TeamPlayers({ playerType, playerNumbers }) {
  const { playerInputs } = useContext(context);
  
  const playersArray = range(1, playerNumbers + 1);
  const players = playerInputs[playerType];
  const noNullPlayers = filter(playerInputs[playerType], (value) => value !== '')

  return (
    <section className="d-flex flex-wrap my-2 justify-content-center">
      {playersArray.map(
        (player, index) =>
          players[`name${player}`] && (
            <div
              key={`${playerType}-player-${index + 1}`}
              className="d-flex mx-5 my-4 flex-fill justify-content-center"
            >
              <div className="border border-dark border-2 btn-lg mx-2">
                {players[`name${player}`]}
              </div>
              <div className="border border-dark border-2 btn-lg">
                {players[`role${player}`]}
              </div>
            </div>
          )
      )}
      {Boolean(noNullPlayers.length) && (
        <hr className="w-100 border-top border-dark border-3" />
      )}
    </section>
  );
}

TeamPlayers.propTypes = {
  playerType: PropTypes.string.isRequired,
  playerNumbers: PropTypes.number.isRequired,
}

export default TeamPlayers
