import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyDq2InHeRIja1xJ8rwPwlINHlDU7GZshTs",
    authDomain: "chat-app-59f8e.firebaseapp.com",
    projectId: "chat-app-59f8e",
    storageBucket: "chat-app-59f8e.appspot.com",
    messagingSenderId: "115418630345",
    appId: "1:115418630345:web:e9d0cabc3aacce5c3ce518",
    measurementId: "G-18QLJKLY4Z"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
 export default firebase