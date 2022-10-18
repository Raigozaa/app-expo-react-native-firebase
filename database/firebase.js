//import firebase from 'firebase'

import firebase from 'firebase';
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDbDeCASJrgXXIjQGQf9hQxIzCwo3PuXxA",
  authDomain: "react-native-firebase-prueba1.firebaseapp.com",
  projectId: "react-native-firebase-prueba1",
  storageBucket: "react-native-firebase-prueba1.appspot.com",
  messagingSenderId: "549535395877",
  appId: "1:549535395877:web:5761e37b5588319d9e0fcc"
};
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore()

  export default {
    firebase,
    db,
  }