import React, { useContext, useState } from 'react';

import { Button, Input } from 'antd';

import { GameContext, UserContext } from 'contexts';

const Boarding: React.FC = () => {
  const { createGame, joinGame, creating, joining } = useContext(GameContext);
  const { updateUsername, user } = useContext(UserContext);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');

  return (
    <div>
      <Input
        placeholder="Game code"
        style={{ width: 100 }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button type="primary" onClick={() => joinGame(code)} loading={joining}>
        Join
      </Button>
      <hr />
      <Button type="primary" onClick={createGame} loading={creating}>
        Create new Game
      </Button>
      <hr />
      <input value={name} onChange={(e) => setName(e.target.value)} />
      <Button onClick={() => updateUsername(name)}>Update name</Button>
      Username: {user.name}
    </div>
  );
};

export default Boarding;
