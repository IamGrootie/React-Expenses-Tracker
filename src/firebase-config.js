import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyCX2m4C5w2UbfXiq4QEGeCdYHpLmTl7qrI",
  authDomain: "expenses-tracker-1aa19.firebaseapp.com",
  projectId: "expenses-tracker-1aa19",
  storageBucket: "expenses-tracker-1aa19.appspot.com",
  messagingSenderId: "193626556002",
  appId: "1:193626556002:web:8af47e5bd39ae99a68333b"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();

export const provider = new GoogleAuthProvider();

