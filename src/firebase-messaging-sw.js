importScripts(
  "https://www.gstatic.com/firebasejs/9.19.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.19.0/firebase-messaging-compat.js"
);

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDDFbUJ90NcZCCNjl2mXtkdwfa2fPPPf3Q",
  authDomain: "sport-calendar-dcaab.firebaseapp.com",
  databaseURL: "https://sport-calendar-dcaab-default-rtdb.firebaseio.com",
  projectId: "sport-calendar-dcaab",
  storageBucket: "sport-calendar-dcaab.appspot.com",
  messagingSenderId: "219696404483",
  appId: "1:219696404483:web:abbdb7f39d2d0559e2d636",
  measurementId: "G-70L3J85XSE",
});

const messaging = firebase.messaging();
