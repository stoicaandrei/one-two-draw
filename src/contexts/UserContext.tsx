import React, { createContext, useState } from 'react';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { UpdateUsername, User } from 'types';

import { projectAuth, projectFirestore, projectFunctions } from 'firebase_config';

type ContextProps = {
  loading: boolean;
  user: User;
  logout: () => void;
  loginWithName: (name: string) => void;
  updateUsername: (name: string) => void;
  error: any;
};

export const UserContext = createContext<ContextProps>({} as ContextProps);

export const UserProvider: React.FC = ({ children }) => {
  const [firebaseUser, loading] = useAuthState(projectAuth);
  const doc = projectFirestore.doc(`users/${firebaseUser ? firebaseUser.uid : '1'}`);
  const [user] = useDocumentData<User>(doc);
  const [error, setError] = useState(null);

  const updateUsername = async (name: string) => {
    const fn: UpdateUsername = projectFunctions.httpsCallable('updateUsername');
    await fn({ name });
  };

  const loginWithName = async (name: string) => {
    try {
      await projectAuth.signInAnonymously();

      await updateUsername(name);
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
        loading,
        error,
        loginWithName,
        logout,
        updateUsername,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
