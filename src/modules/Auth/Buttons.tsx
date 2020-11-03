import React, { useContext } from 'react';

import { Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import { UserContext } from 'contexts';

type Props = {
  name: string;
};

export const LoginWithName: React.FC<Props> = ({ name }) => {
  const { loginWithName } = useContext(UserContext);

  return (
    <div>
      <Button onClick={() => loginWithName(name)}>
        <UserOutlined />
        Login
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
