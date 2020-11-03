import React, { useContext, useState } from 'react';

import { Logout, LoginWithName } from './Buttons';

import { UserContext } from 'contexts';

const Auth: React.FC = () => {
  const { user } = useContext(UserContext);

  const [name, setName] = useState('');

  return (
    <div>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <LoginWithName name={name} />
      <Logout />
      {user?.uid}
      <br />
      {user?.displayName || 'please log in'}
    </div>
  );
};

export default Auth;
