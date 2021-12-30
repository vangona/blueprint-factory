import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAyWUFvA5F9Kz9WTr6Wfzbt2QYUZLouyr0",
    authDomain: "blueprint-maker.firebaseapp.com",
    projectId: "blueprint-maker",
    storageBucket: "blueprint-maker.appspot.com",
    messagingSenderId: "746433001477",
    appId: "1:746433001477:web:acce2d2088ad087f93046c",
    measurementId: "G-T09W6YS0ZP"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export const firebaseInstance = firebase;

export const messaging = firebase.messaging();
export const authService = firebase.auth();
export const dbService = firebase.firestore();
export const storageService = firebase.storage();

