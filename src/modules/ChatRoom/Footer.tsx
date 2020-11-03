import React, { useContext, useState } from 'react';

import { Input, Button } from 'antd';
import { ChatContext } from 'contexts';

const Footer: React.FC = () => {
  const { sendMessage } = useContext(ChatContext);

  const [textInput, setTextInput] = useState('');

  const handleSend = () => {
    sendMessage(textInput);
    setTextInput('');
  };

  return (
    <div>
      <Input
        value={textInput}
        onChange={(e) => setTextInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
      />
      <Button type="primary" onClick={handleSend}>
        Send
      </Button>
    </div>
  );
};

export default Footer;
