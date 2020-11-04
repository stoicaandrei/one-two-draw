import React, { useContext, useState } from 'react';

import { Button, Input } from 'antd';

import { GameContext, UserContext } from 'contexts';

const Boarding: React.FC = () => {
  const { createGame } = useContext(GameContext);
  const { logout, updateUsername, user } = useContext(UserContext);

  const [name, setName] = useState('');

  return (
    <div>
      <Input placeholder="Game code" style={{ width: 100 }} />
      <Button type="primary">Join</Button>
      <hr />
      <Button type="primary" onClick={createGame}>
        Create new Game
      </Button>
      <hr />
      <Button onClick={logout}>Logout</Button>
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={() => updateUsername(name)}>Update name</Button>
      Username: {user.name}
    </div>
  );
};

export default Boarding;
