import React, { useContext } from 'react';

import PendingScreen from './PendingScreen';
import PlayingScreen from './PlayingScreen';
import FinishScreen from './FinishScreen';

import { FINISHED, GameContext, PENDING, PLAYING } from 'contexts';

const Game: React.FC = () => {
  const { game } = useContext(GameContext);

  switch (game.state) {
    case PENDING:
      return <PendingScreen />;
    case PLAYING:
      return <PlayingScreen />;
    case FINISHED:
      return <FinishScreen />;
    default:
      return <p>idk man what did you do</p>;
  }
};

export default Game;
