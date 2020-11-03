import React, { useContext } from 'react';

import { Button } from 'antd';
import { GoogleOutlined, UserOutlined } from '@ant-design/icons';

import { UserContext } from 'contexts';

export const LoginWithGoogle: React.FC = () => {
  const { loginWithGoogle } = useContext(UserContext);

  return (
    <div>
      <Button onClick={loginWithGoogle}>
        <GoogleOutlined />
        Login with google
      </Button>
    </div>
  );
};

export const LoginAnonymously: React.FC = () => {
  const { loginAnonymously } = useContext(UserContext);

  return (
    <div>
      <Button onClick={loginAnonymously}>
        <UserOutlined />
        Login Anonymously
      </Button>
    </div>
  );
};

export const Logout: React.FC = () => {
  const { logout } = useContext(UserContext);

  return (
    <div>
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
