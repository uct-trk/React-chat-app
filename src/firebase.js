import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyAjCYiBilzqpXncBIuug1st7ZKuPPZYbkE",
    authDomain: "uct-chat-app.firebaseapp.com",
    projectId: "uct-chat-app",
    storageBucket: "uct-chat-app.appspot.com",
    messagingSenderId: "880669379862",
    appId: "1:880669379862:web:89dddb9b106af91df0d437",
    measurementId: "G-LSDZL1NWLQ"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 

  export default firebase