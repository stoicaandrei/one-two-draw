import React, { useContext } from 'react';

import { Button, Input } from 'antd';

import { GameContext } from 'contexts';

const Boarding: React.FC = () => {
  const { createGame } = useContext(GameContext);

  return (
    <div>
      <Input placeholder="Game code" style={{ width: 100 }} />
      <Button type="primary">Join</Button>
      <hr />
      <Button type="primary" onClick={createGame}>
        Create new Game
      </Button>
    </div>
  );
};

export default Boarding;
