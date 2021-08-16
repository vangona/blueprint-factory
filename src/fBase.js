import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBQ8ykklh7rB2m3VlXwgXXkM_BcN3XZbB4",
  authDomain: "happycommunity-779a4.firebaseapp.com",
  projectId: "happycommunity-779a4",
  storageBucket: "happycommunity-779a4.appspot.com",
  messagingSenderId: "70801014522",
  appId: "1:70801014522:web:c77dce79eaee57a7ef9343",
  measurementId: "G-FZ1E56E1BS"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();