import React, { createContext, useEffect, useState } from 'react';

import firebase from 'firebase/app';
import 'firebase/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

import { projectAuth, projectDatabase, projectFunctions } from 'firebase_config';

const defaultUser = {
  uid: '',
  displayName: '',
  photoURL: '',
};

const defaultState = {
  loading: false,
  user: defaultUser,
  logout: async () => {
    /*empty*/
  },
  loginWithGoogle: async () => {
    /*empty*/
  },
  loginAnonymously: async () => {
    /*empty*/
  },
  getEvents: async () => {
    /*empty*/
  },
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
  loginWithGoogle: () => void;
  loginAnonymously: () => void;
  getEvents: () => void;
  error: any;
};

export const UserContext = createContext<ContextProps>(defaultState);

export const UserProvider: React.FC = ({ children }) => {
  const [firebaseUser, loading] = useAuthState(projectAuth);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const rawUser = localStorage.getItem('user');
    const localUser = rawUser ? JSON.parse(rawUser) : null;
    setUser(localUser);
  }, []);

  useEffect(() => {
    if (!firebaseUser) return;

    localStorage.setItem('user', JSON.stringify(firebaseUser));
    setUser(firebaseUser);

    const setRandomName = async () => {
      const id = Math.random().toString(36).substring(7).toUpperCase();
      projectDatabase.ref(`users/${firebaseUser.uid}`).set({ displayName: `ID ${id}` });
    };

    if (!firebaseUser.displayName) setRandomName().then();
  }, [firebaseUser]);

  const loginWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('https://www.googleapis.com/auth/calendar.events.readonly');

    try {
      await projectAuth.signInWithPopup(provider);
    } catch (error) {
      setError(error);
    }
  };

  const loginAnonymously = async () => {
    try {
      await projectAuth.signInAnonymously();
    } catch (error) {
      setError(error);
    }
  };

  const logout = async () => {
    await projectAuth.signOut();
    localStorage.removeItem('user');
    setUser(null);
  };

  const getEvents = async () => {
    const fn = projectFunctions.httpsCallable('getEvents');
    await fn();
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        error,
        loginWithGoogle,
        loginAnonymously,
        logout,
        getEvents,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
