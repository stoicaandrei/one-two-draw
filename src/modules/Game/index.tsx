import React, { useContext } from 'react';

import PendingScreen from './PendingScreen';

import { GameContext, PENDING } from 'contexts';

const Game: React.FC = () => {
  const { game } = useContext(GameContext);

  console.log(game);

  if (game.state === PENDING) return <PendingScreen />;

  return <p>playing</p>;
};

export default Game;
