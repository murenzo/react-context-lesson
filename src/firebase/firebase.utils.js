import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBqvwqZjKLxH7nuRaU7GfKeJNimeSlnA7M",
  authDomain: "crwn-db-4dc15.firebaseapp.com",
  databaseURL: "https://crwn-db-4dc15.firebaseio.com",
  projectId: "crwn-db-4dc15",
  storageBucket: "crwn-db-4dc15.appspot.com",
  messagingSenderId: "352810866522",
  appId: "1:352810866522:web:bad1907e028ed721350563",
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
