import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDDZQgkJxWTjJ1fMuTpGZDX2fHFovdhXbA',
  authDomain: 'hy-wild-boars.firebaseapp.com',
  databaseURL: 'https://hy-wild-boars.firebaseio.com',
  projectId: 'hy-wild-boars',
  storageBucket: 'hy-wild-boars.appspot.com',
  messagingSenderId: '765230894233',
  appId: '1:765230894233:web:b6bf47177f1bc2489cbc08',
  measurementId: 'G-V3FV6HXWQE',
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export const serverTimestamp = () => {
  return firebase.firestore.FieldValue.serverTimestamp();
};
export const GeoPoint = firebase.firestore.GeoPoint;
