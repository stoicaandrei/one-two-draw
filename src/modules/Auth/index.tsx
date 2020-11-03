import React, { useContext } from 'react';

import AuthEnforcer from './AuthEnforcer';

import { UserContext } from 'contexts';

const Auth: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <AuthEnforcer>
        <p>{user.uid}</p>
        <p>{user.displayName}</p>
      </AuthEnforcer>
    </div>
  );
};

export default Auth;
