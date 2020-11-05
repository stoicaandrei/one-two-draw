import React, { createContext, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { UpdateUsername, User } from 'types';

import { projectAuth, projectFirestore, projectFunctions } from 'firebase_config';

type ContextProps = {
  loading: boolean;
  user: User;
  logout: () => void;
  login: () => void;
  updateUsername: (name: string) => void;
  error: any;
};

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider: React.FC = ({ children }) => {
  const [firebaseUser, loading1] = useAuthState(projectAuth);
  const doc = projectFirestore.doc(`users/${firebaseUser ? firebaseUser.uid : '1'}`);
  const [user, loading2] = useDocumentData<User>(doc);
  const [error, setError] = useState(null);

  const updateUsername = async (name: string) => {
    const fn: UpdateUsername = projectFunctions.httpsCallable('updateUsername');
    await fn({ name });
  };

  const login = async () => {
    try {
      await projectAuth.signInAnonymously();
    } catch (error) {
      setError(error);
    }
  };

  const logout = async () => {
    await projectAuth.signOut();
    localStorage.removeItem('user');
  };

  return (
    <UserContext.Provider
      value={{
        user: user || (undefined as any),
        loading: loading1 || loading2,
        error,
        login,
        logout,
        updateUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
