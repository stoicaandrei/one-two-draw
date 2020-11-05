import React, { createContext, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

import { projectAuth } from 'firebase_config';

type ContextProps = {
  loading: boolean;
  uid: string;
  username: string;
  setUsername: (name: string) => void;
  login: () => void;
  error: any;
};

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider: React.FC = ({ children }) => {
  const [firebaseUser, loading1] = useAuthState(projectAuth);
  const [error, setError] = useState(null);

  const [username, setUsername] = useState('');

  const login = async () => {
    try {
      await projectAuth.signInAnonymously();
    } catch (error) {
      setError(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        uid: firebaseUser?.uid as string,
        username,
        setUsername,
        loading: loading1,
        error,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
