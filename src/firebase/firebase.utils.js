import firebase from "firebase/app";

import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCfDKHxR6aUSN3NmqrbcPOH-iFYt6SgbS4",
    authDomain: "mobioshop-db.firebaseapp.com",
    databaseURL: "https://mobioshop-db.firebaseio.com",
    projectId: "mobioshop-db",
    storageBucket: "mobioshop-db.appspot.com",
    messagingSenderId: "146701538208",
    appId: "1:146701538208:web:26cc436602b508f5b40ac5",
    measurementId: "G-9BBPG4EWM5"
  };

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;