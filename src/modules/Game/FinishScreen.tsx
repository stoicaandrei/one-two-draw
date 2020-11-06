import React, { useContext } from 'react';

import { Image, Button } from 'antd';

import { GameContext } from 'contexts';

const FinishScreen: React.FC = () => {
  const { game, leaveGame } = useContext(GameContext);

  return (
    <div>
      <ul>
        {game.players.map((pl) => (
          <li key={pl.uid}>
            {pl.name} <Image width={200} src={pl.drawingUrl} />{' '}
          </li>
        ))}
      </ul>
      <Button onClick={leaveGame}>Leave</Button>
    </div>
  );
};

export default FinishScreen;
