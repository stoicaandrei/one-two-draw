import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';

import { Image } from 'antd';

import DrawingCanvas from './DrawingCanvas';

import { GameContext, UserContext } from 'contexts';

const useTimeout = (callback: () => void, timeout: number = 0): (() => void) => {
  const timeoutIdRef = useRef<NodeJS.Timeout>();
  const cancel = useCallback(() => {
    const timeoutId = timeoutIdRef.current;
    if (timeoutId) {
      timeoutIdRef.current = undefined;
      clearTimeout(timeoutId);
    }
  }, [timeoutIdRef]);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(callback, timeout);
    return cancel;
  }, [callback, timeout, cancel]);

  return cancel;
};

const PlayingScreen: React.FC = () => {
  const { uid } = useContext(UserContext);
  const { uploadDrawing, watchDrawing, uploading, currentPlayer, prevPlayer } = useContext(
    GameContext
  );

  useEffect(() => {
    if (uid === currentPlayer?.uid) {
      setTimeout(() => {
        watchDrawing();
      }, 10 * 1000);
    }
  }, [currentPlayer, uid, watchDrawing]);

  if (!currentPlayer) return null;

  if (uid !== currentPlayer.uid) return <div>{currentPlayer.name} is drawing...</div>;

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
