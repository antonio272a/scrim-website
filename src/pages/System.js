import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";
import Header from "../components/Header";
import ValorantPlayerInput from "../components/inputs/playersInputs/ValorantPlayerInput";
import { getPlayers } from "../supabase/utils/playersUtils";

function System() {
  const [selectedGame, setSelectedGame] = useState('');
  const [players, setPlayers] = useState([]);

  const getAllPlayers = async () => {
    const players = await getPlayers(`${selectedGame.value}_players`);
    setPlayers(players)
    console.log(players);
  };

  useEffect(() => {
    if(!selectedGame) return;
    getAllPlayers();
  }, [selectedGame]);

  const games = ['valorant', 'paladins'];
  const gamesOptions = games.map((game) => ({
    value: game,
    label: game
  }))
  useEffect(() => {
    setSelectedGame(gamesOptions[0])

  }, [])
  
  const gameInputs = {
    'valorant': <ValorantPlayerInput />,
    'paladins': <p>paladins</p>
  }

  const createPlayersTable = () => {
    if(!players.length) return;
    const heads = Object.keys(players[0])

   return ( 
    <table className="table table-bordered mt-5">
      <thead>
        <tr>
          {heads.map((head) => (<th scope="col" key={`head-${head}`}>{head}</th>))}
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={`player-${player.id}`}>
            {heads.map((head) => (<td key={`player-${head}-${player.id}`}>{String(player[head])}</td>))}
          </tr>
        ))}
      </tbody>
    </table>
    )
  }

  return (
    <div>
      <Header />
      <main className="container my-5">
        <section className="text-center">
          <h4>Adiconar Jogador</h4>
          <Select 
            id='roles-select'
            options={gamesOptions}
            value={selectedGame}
            onChange={(roles) => {
              setSelectedGame(roles);
            }}
          />
          {gameInputs[selectedGame.value]}
        </section>
        <section>
          {createPlayersTable()}
        </section>
      </main>
    </div>
  );
}

export default System;
