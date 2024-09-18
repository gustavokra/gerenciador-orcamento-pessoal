import { initializeApp } from "firebase/app";
import {getFirestore } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import config from './firebase.json'

const firebaseConfig = config.firebaseConfig;

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const auth = getAuth(app)
const analytics = getAnalytics(app);