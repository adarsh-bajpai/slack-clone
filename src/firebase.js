import { initializeApp } from "firebase/app";

import { GoogleAuthProvider } from "firebase/auth";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCPwxT7MvxjntDjDlyZjxR3phhs4ytbc7Y",
  authDomain: "slack-92875.firebaseapp.com",
  projectId: "slack-92875",
  storageBucket: "slack-92875.appspot.com",
  messagingSenderId: "1097283324532",
  appId: "1:1097283324532:web:6dbf9022e390ca55545f21",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const auth = getAuth();
const provider = new GoogleAuthProvider();

export { auth, provider, db };
