import React, { useContext } from 'react';

import PendingScreen from './PendingScreen';
import PlayingScreen from './PlayingScreen';

import { GameContext, PENDING, PLAYING } from 'contexts';

const Game: React.FC = () => {
  const { game } = useContext(GameContext);

  console.log(game);

  if (game.state === PENDING) return <PendingScreen />;

  if (game.state === PLAYING) return <PlayingScreen />;

  return <p>playing</p>;
};

export default Game;
