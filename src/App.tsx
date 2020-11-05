import React, { useContext } from 'react';

import Boarding from './modules/Boarding';
import AuthEnforcer from './modules/Auth/AuthEnforcer';
import Game from './modules/Game';

import { GameContext } from 'contexts';

function App() {
  const { game } = useContext(GameContext);

  return (
    <div className="App">
      <AuthEnforcer>{game ? <Game /> : <Boarding />}</AuthEnforcer>
    </div>
  );
}

export default App;
