import React from 'react';

import { Button, Input } from 'antd';

const Boarding: React.FC = () => {
  return (
    <div>
      <Input placeholder="Game code" style={{ width: 100 }} />
      <Button type="primary">Join</Button>
      <hr />
      <Button type="primary">Create new Game</Button>
    </div>
  );
};

export default Boarding;
