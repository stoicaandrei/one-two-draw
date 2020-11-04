import React, { createContext, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

import { projectAuth } from 'firebase_config';
import { randomId } from './utils';

const defaultUser = {
  uid: '',
  displayName: '',
};

const defaultState = {
  loading: false,
  user: defaultUser,
  logout: () => {},
  loginWithName: () => {},
  error: null,
};

export type User = {
  uid: string;
  displayName: string;
};

type ContextProps = {
  loading: boolean;
  user: User;
  logout: () => void;
  loginWithName: (name: string) => void;
  error: any;
};

export const UserContext = createContext<ContextProps>(defaultState);

export const UserProvider: React.FC = ({ children }) => {
  const [firebaseUser, loading] = useAuthState(projectAuth);
  const [user, setUser] = useState<User>({} as any);
  const [error, setError] = useState(null);

  const [nameWaiting, setNameWaiting] = useState(false);

  useEffect(() => {
    if (!firebaseUser) return;
    if (!firebaseUser.displayName && nameWaiting) return;

    localStorage.setItem('user', JSON.stringify(firebaseUser));
    setUser(firebaseUser);
  }, [firebaseUser, nameWaiting]);

  const loginWithName = async (name: string) => {
    try {
      setNameWaiting(true);
      const userCredential = await projectAuth.signInAnonymously();
      const newUser = userCredential.user;

      if (!newUser) return;

      const id = randomId();

      await newUser.updateProfile({ displayName: `${name} #${id}` });
      setNameWaiting(false);
    } catch (error) {
      setError(error);
    }
  };

  const logout = async () => {
    await projectAuth.signOut();
    localStorage.removeItem('user');
    setUser(null as any);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading: loading || nameWaiting,
        error,
        loginWithName,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
