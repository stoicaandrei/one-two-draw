import React, { useContext, useState } from 'react';

import { Button, Input } from 'antd';

import { GameContext, UserContext } from 'contexts';

const Boarding: React.FC = () => {
  const { createGame, joinGame, creating, joining } = useContext(GameContext);
  const { setUsername, username } = useContext(UserContext);

  const [code, setCode] = useState('');

  return (
    <div>
      <Input
        placeholder="Game code"
        style={{ width: 100 }}
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <Button type="primary" onClick={() => joinGame(code)} loading={joining} disabled={!username}>
        Join
      </Button>
      <hr />
      <Button type="primary" onClick={createGame} loading={creating} disabled={!username}>
        Create new Game
      </Button>
      <hr />
      <input
        placeholder="Enter your name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
    </div>
  );
};

export default Boarding;
