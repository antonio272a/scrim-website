import React from "react";
import { useState } from "react";
import { createPlayer } from "../../../supabase/utils/playersUtils";

function ValorantPlayerInput() {
  const [gameName, setGameName] = useState('');
  const [riotId, setRiotId] = useState('');
  const [points, setPoints] = useState(0);
  
  const resetFields = () => {
    setGameName('');
    setRiotId('');
    setPoints(0);
  }

  const addPlayer = async () => {
    const body = {
      game_name: gameName,
      riot_id: riotId,
      points: points
    }
    const result = await createPlayer('valorant_players', body);
    resetFields();
    window.location.reload()
    console.log(result);
  }

  return (
    <section className="d-flex flex-column justify-content-center text-center mt-5">
      <div className="form-floating mt-3">
        <input id="game-name-input" className="form-control" type="text" value={gameName} onChange={({ target: { value } }) => setGameName(value)} />
        <label htmlFor="game-name-input">Game Name</label>
      </div>
      <div className="form-floating mt-3">
        <input id="riot-id-input" className="form-control" type="text" value={riotId} onChange={({ target: { value } }) => setRiotId(value)} />
        <label htmlFor="riot-id-input">Riot Id</label>
      </div>
      <div className="form-floating mt-3">
        <input id="points-input" className="form-control" type="number" value={points} onChange={({ target: { value } }) => setPoints(value)} />
        <label htmlFor="points-input">Pontos</label>
      </div>
      <div>
        <button type="button" className="btn btn-success mt-3" onClick={addPlayer}>
          Adicionar
        </button>
      </div>
    </section>
  );
}

export default ValorantPlayerInput;
