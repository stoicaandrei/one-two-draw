import React, { useContext, useEffect } from 'react';

import { UserContext } from 'contexts';

const AuthWrapper: React.FC = ({ children }) => {
  const { uid, loading, error, login } = useContext(UserContext);

  useEffect(() => {
    if (!uid) login();
  }, [login, uid, loading]);

  if (error) return <div>{error}</div>;

  if (!uid) return <div>connecting...</div>;

  return <div>{children}</div>;
};

export default AuthWrapper;
