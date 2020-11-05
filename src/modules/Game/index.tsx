import React, { useContext } from 'react';

import { Button } from 'antd';

import { GameContext } from 'contexts';

const Game: React.FC = () => {
  const { game, leaveGame } = useContext(GameContext);

  console.log(game);

  return (
    <div>
      <p>Code: {game.code}</p>
      Players:
      <ul>
        {game.players.map((pl) => (
          <li key={pl.uid}>{pl.name}</li>
        ))}
      </ul>
      <Button onClick={leaveGame}>leave</Button>
    </div>
  );
};

export default Game;
