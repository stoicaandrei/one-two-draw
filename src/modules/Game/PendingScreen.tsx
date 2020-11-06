import React, { useContext } from 'react';

import { Button } from 'antd';

import { GameContext, UserContext } from 'contexts';

const PendingScreen: React.FC = () => {
  const { uid } = useContext(UserContext);
  const { game, leaveGame, startGame } = useContext(GameContext);

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
      {game.creatorUid === uid && (
        <Button type="primary" onClick={() => startGame(game.code)}>
          Start Game
        </Button>
      )}
    </div>
  );
};

export default PendingScreen;
