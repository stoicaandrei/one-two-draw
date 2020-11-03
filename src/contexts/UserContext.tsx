import React, { createContext, useEffect, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';

import { projectAuth, projectDatabase } from 'firebase_config';

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

  const [nameUpdate, setNameUpdate] = useState(false);

  useEffect(() => {
    if (!firebaseUser) return;
    if (!firebaseUser.displayName && !nameUpdate) return;

    localStorage.setItem('user', JSON.stringify(firebaseUser));
    setUser(firebaseUser);
  }, [firebaseUser, nameUpdate]);

  const loginWithName = async (name: string) => {
    try {
      const userCredential = await projectAuth.signInAnonymously();
      const newUser = userCredential.user;

      if (!newUser) return;

      await newUser.updateProfile({ displayName: name });
      setNameUpdate(true);
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
        loading,
        error,
        loginWithName,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
