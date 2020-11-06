import React, { useContext } from 'react';

import DrawingCanvas from './DrawingCanvas';

import { GameContext } from 'contexts';

const PlayingScreen: React.FC = () => {
  const { uploadDrawing, finishGame } = useContext(GameContext);

  return (
    <div>
      <DrawingCanvas handleSave={uploadDrawing} />
      <button onClick={finishGame}>finish game</button>
    </div>
  );
};

export default PlayingScreen;
