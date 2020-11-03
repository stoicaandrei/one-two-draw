import React, { useContext, useState } from 'react';

import { Logout, LoginWithName } from './Buttons';
import AuthEnforcer from './AuthEnforcer';

import { UserContext } from 'contexts';

const Auth: React.FC = () => {
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');

  return (
    <div>
      <AuthEnforcer>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        <LoginWithName name={name} />
        <Logout />
        {user?.uid}
        <br />
        {user?.displayName || 'please log in'}
      </AuthEnforcer>
    </div>
  );
};

export default Auth;
