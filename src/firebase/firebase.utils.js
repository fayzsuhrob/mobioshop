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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set(
        {
          displayName,
          email,
          createdAt,
          ...additionalData
        }
      )
    } catch (error) {
      console.log('error creating a user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(config);

export const convertCollectionsSnapshotToMap = (collectionsSnapshot) => {
  const transformedCollection = collectionsSnapshot.docs.map(docSnapshot => {
      const {title, items} = docSnapshot.data();
      
      return {
        routeName: encodeURI(title.toLowerCase()),
        id: docSnapshot.id,
        title,
        items
      }
    }
  );

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc();
    batch.set(newDocRef, obj);
  })
  
  return await batch.commit();
};


export default firebase;