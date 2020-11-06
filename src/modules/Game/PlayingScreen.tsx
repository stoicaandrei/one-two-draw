import React, { useContext } from 'react';

import DrawingCanvas from './DrawingCanvas';

import { GameContext, UserContext } from 'contexts';

const PlayingScreen: React.FC = () => {
  const { uid } = useContext(UserContext);
  const { uploadDrawing, uploading, currentPlayer } = useContext(GameContext);

  if (!currentPlayer) return null;

  if (uid === currentPlayer.uid)
    return (
      <div>
        <DrawingCanvas handleSave={uploadDrawing} loading={uploading} />
      </div>
    );

  return <div>{currentPlayer.name} is drawing...</div>;
};

export default PlayingScreen;
