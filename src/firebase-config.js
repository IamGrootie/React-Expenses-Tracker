
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { GoogleAuthProvider } from "firebase/auth";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDqz_jtMS1iGk9UhE_ld99RDVfbb73eOdQ",
  authDomain: "dbest-note-app-3eee6.firebaseapp.com",
  projectId: "dbest-note-app-3eee6",
  storageBucket: "dbest-note-app-3eee6.appspot.com",
  messagingSenderId: "575116228337",
  appId: "1:575116228337:web:8bd75929e67ba542bf5b50",
  measurementId: "G-R6P526PLMF"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth();


export const provider = new GoogleAuthProvider();