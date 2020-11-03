import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: "AIzaSyCh_miXz_3C9Ep2nV6RC0a_aRfP9JtlwYQ",
  authDomain: "one-two-draw.firebaseapp.com",
  databaseURL: "https://one-two-draw.firebaseio.com",
  projectId: "one-two-draw",
  storageBucket: "one-two-draw.appspot.com",
  messagingSenderId: "927042823933",
  appId: "1:927042823933:web:37017c8bcd6e9cf5d0c094",
  measurementId: "G-TMSG9NM8SF"
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
