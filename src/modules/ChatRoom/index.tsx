import React from 'react';

import { Card } from 'antd';

import Messages from './Messages';
import Footer from './Footer';

const ChartRoom: React.FC = () => {
  return (
    <Card title="Chat Room">
      <Messages />
      <Footer />
    </Card>
  );
};

export default ChartRoom;
