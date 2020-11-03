import React, { createContext, useContext, useState } from 'react';

import 'firebase/auth';

import { timestamp, projectFirestore } from 'firebase_config';
import { useCollectionData } from 'react-firebase-hooks/firestore';

import { UserContext } from './UserContext';

type Message = {
  id: string;
  text: string;
  photoURL: string;
  createdAt: any;
  uid: string;
};

type ContextProps = {
  loading: boolean;
  messages: Message[];
  sendMessage: (text: string) => void;
  error?: any;
};

export const ChatContext = createContext<ContextProps>({
  loading: false,
  messages: [],
  sendMessage: () => {},
});

export const ChatProvider: React.FC = ({ children }) => {
  const messagesRef = projectFirestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const { user } = useContext(UserContext);

  const [messages, loading] = useCollectionData<Message>(query, { idField: 'id' });
  const [error, setError] = useState(null);

  const sendMessage = async (text: string) => {
    if (!user) return;

    try {
      await messagesRef.add({
        text: text,
        createdAt: timestamp(),
        uid: user.uid,
        photoURL: user.photoURL,
      });
    } catch (e) {
      setError(e);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages: messages || [],
        loading,
        error,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
