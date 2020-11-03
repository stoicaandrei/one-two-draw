import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: 'AIzaSyDm6piMCaWI5cQ5CYjgJYWI67RzKFJz-QE',
  authDomain: 'when2meet-565d0.firebaseapp.com',
  databaseURL: 'https://when2meet-565d0.firebaseio.com',
  projectId: 'when2meet-565d0',
  storageBucket: 'when2meet-565d0.appspot.com',
  messagingSenderId: '1016013539665',
  appId: '1:1016013539665:web:30d52d011e959a10faeb70',
  measurementId: 'G-Z75ZN1RPHS',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export const projectStorage = firebase.storage();
export const projectFirestore = firebase.firestore();
export const projectAuth = firebase.auth();
export const projectDatabase = firebase.database();
export const projectFunctions = firebase.functions();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
