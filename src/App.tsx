import React from 'react';

import Boarding from './modules/Boarding';
import AuthEnforcer from './modules/Auth/AuthEnforcer';

function App() {
  return (
    <div className="App">
      <AuthEnforcer>
        <Boarding />
      </AuthEnforcer>
    </div>
  );
}

export default App;
