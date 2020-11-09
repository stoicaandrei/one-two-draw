import React, { useContext } from 'react';

import Boarding from './modules/Boarding';
import AuthWrapper from './modules/Auth/AuthWrapper';
import Game from './modules/Game';

import { GameContext } from 'contexts';

function App() {
  const { game } = useContext(GameContext);

  return (
    <div className="App">
      {/* AuthWrapper makes sure that the user is automatically authenticated */}
      <AuthWrapper>{game ? <Game /> : <Boarding />}</AuthWrapper>
    </div>
  );
}

export default App;
