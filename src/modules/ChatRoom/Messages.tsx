import React, { useContext } from 'react';

import { ChatContext, UserContext } from 'contexts';

const Messages: React.FC = () => {
  const { user } = useContext(UserContext);
  const { messages } = useContext(ChatContext);

  const userId = user?.uid;

  return (
    <div>
      Messages{' '}
      <ul>
        {messages.map((m) => {
          const { text } = m;
          const wasSend = m.uid === userId;

          return (
            <li key={m.id}>
              {text}({wasSend ? 'send' : 'received'})
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Messages;
