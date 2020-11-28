import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDDZQgkJxWTjJ1fMuTpGZDX2fHFovdhXbA",
    authDomain: "hy-wild-boars.firebaseapp.com",
    databaseURL: "https://hy-wild-boars.firebaseio.com",
    projectId: "hy-wild-boars",
    storageBucket: "hy-wild-boars.appspot.com",
    messagingSenderId: "765230894233",
    appId: "1:765230894233:web:d9c5e2f448b798799cbc08",
    measurementId: "G-T4GVQMBBN4"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth()
export const db = firebase.firestore()
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
