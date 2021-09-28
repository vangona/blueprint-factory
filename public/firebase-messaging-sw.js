importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.8.0/firebase-messaging.js');

const config =  { 
    apiKey: "AIzaSyBQ8ykklh7rB2m3VlXwgXXkM_BcN3XZbB4",
    projectId: "happycommunity-779a4",
    messagingSenderId: "70801014522",
    appId: "1:70801014522:web:c77dce79eaee57a7ef9343",
}; 
firebase.initializeApp(config);

const messaging = firebase.messaging();