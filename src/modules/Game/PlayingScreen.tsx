import React, { useContext, useEffect } from 'react';

import { Image } from 'antd';

import DrawingCanvas from './DrawingCanvas';

import { GameContext, UserContext } from 'contexts';

const PlayingScreen: React.FC = () => {
  const { uid } = useContext(UserContext);
  const {
    uploadDrawing,
    watchDrawing,
    uploading,
    currentPlayer,
    prevPlayer,
    nextPlayer,
  } = useContext(GameContext);

  useEffect(() => {
    if (uid === currentPlayer?.uid) {
      setTimeout(() => {
        watchDrawing();
      }, 10 * 1000);
    }
  }, [currentPlayer, uid, watchDrawing]);

  if (!currentPlayer) return null;

  if (uid !== currentPlayer.uid)
    return (
      <div>
        <p>{currentPlayer.name} is drawing...</p>
        {nextPlayer && <p>next player is {nextPlayer.name}</p>}
      </div>
    );

  if (prevPlayer && !currentPlayer.watchedPreviousDrawing)
    return (
      <div>
        Take a good look at this
        <Image src={prevPlayer.drawingUrl} />
      </div>
    );

  return (
    <div>
      <DrawingCanvas handleSave={uploadDrawing} loading={uploading} />
    </div>
  );
};

export default PlayingScreen;
