import React, { useState, useContext, useEffect } from 'react';

import { Modal, Row, Col, Input, Button } from 'antd';

import { UserContext } from 'contexts';

const AuthWrapper: React.FC = ({ children }) => {
  const { user, loading, error, login } = useContext(UserContext);

  useEffect(() => {
    if (!user) login();
  }, [login, user, loading]);

  if (error) return <div>{error}</div>;

  if (!user) return <div>connecting..</div>;

  return <div>{children}</div>;
};

export default AuthWrapper;
