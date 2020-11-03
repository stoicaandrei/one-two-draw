import React from 'react';

import Auth from './modules/Auth';
import AuthEnforcer from './modules/Auth/AuthEnforcer';

function App() {
  return (
    <div className="App">
      <AuthEnforcer>
        <Auth />
      </AuthEnforcer>
    </div>
  );
}

export default App;
