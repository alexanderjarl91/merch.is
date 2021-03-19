import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.FIREBASE_API_KEY,
//   authDomain: process.env.FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.FIREBASE_PROJECT_ID,
//   storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.FIREBASE_APP_ID,
// };

const firebaseConfig2 = {
  apiKey: "AIzaSyB676fUgG2M2qvZATjpiCPz46el0Eb4ZNc",
  authDomain: "merch-6a90c.firebaseapp.com",
  projectId: "merch-6a90c",
  storageBucket: "merch-6a90c.appspot.com",
  messagingSenderId: "680495352452",
  appId: "1:680495352452:web:6bae361279e97177e590d1",
};

const fire = firebase.apps.length
  ? firebase.app()
  : firebase.initializeApp(firebaseConfig2);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();

export default fire;
