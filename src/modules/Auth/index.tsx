import React, { useContext } from 'react';

import AuthWrapper from './AuthWrapper';

import { UserContext } from 'contexts';

const Auth: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <AuthWrapper>
        <p>{user.name}</p>
      </AuthWrapper>
    </div>
  );
};

export default Auth;
