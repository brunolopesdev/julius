import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDVdP4AZQFSBMwYvdDDFBz9m93yYfcXUH8",
  authDomain: "julius-bb8f2.firebaseapp.com",
  projectId: "julius-bb8f2",
  storageBucket: "julius-bb8f2.appspot.com",
  messagingSenderId: "680130169007",
  appId: "1:680130169007:web:7be4ed37713ba956b4ac5a",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore();
export const auth = getAuth();
