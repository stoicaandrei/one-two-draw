import React, { createContext, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

import { projectAuth } from 'firebase_config';

const defaultUser = {
  uid: '',
  displayName: '',
  photoURL: '',
};

const defaultState = {
  loading: false,
  user: defaultUser,
  logout: () => {},
  loginWithName: () => {},
  error: null,
};

type User = {
  uid: string;
  displayName: string;
  photoURL: string;
};

type ContextProps = {
  loading: boolean;
  user: User | null;
  logout: () => void;
  loginWithName: (name: string) => void;
  error: any;
};

export const UserContext = createContext<ContextProps>(defaultState);

export const UserProvider: React.FC = ({ children }) => {
  const [firebaseUser, loading] = useAuthState(projectAuth);
  const [user, setUser] = useState(null);
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

      await newUser.updateProfile({ displayName: name });
      setNameWaiting(false);
    } catch (error) {
      setError(error);
    }
  };

  const logout = async () => {
    await projectAuth.signOut();
    localStorage.removeItem('user');
    setUser(null);
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
