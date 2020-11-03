import React, { useContext } from 'react';

import { LoginWithGoogle, LoginAnonymously, Logout } from './Buttons';

import { UserContext } from 'contexts';

const Auth: React.FC = () => {
  const { user, getEvents } = useContext(UserContext);

  return (
    <div>
      <LoginWithGoogle />
      <LoginAnonymously />
      <Logout />
      <button onClick={getEvents}>test</button>
      {user?.displayName}
    </div>
  );
};

export default Auth;
