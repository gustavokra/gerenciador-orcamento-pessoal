import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getAuth,  signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import config from './firebase.json'


const firebaseConfig = config.firebaseConfig;

const signInWithEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  
  const signUpWithEmail = (email: string, password: string) => {
    console.log(auth)
    return createUserWithEmailAndPassword(auth, email, password);
  };
  
  const logout = () => {
    return signOut(auth);
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
export { auth, db, signInWithEmail, signUpWithEmail, logout };
