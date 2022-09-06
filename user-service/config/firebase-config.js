// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeJkEKRIYJg1p2iP9-ybSlPl8Ye-7ZqjU",
  authDomain: "peerprep-eacee.firebaseapp.com",
  projectId: "peerprep-eacee",
  storageBucket: "peerprep-eacee.appspot.com",
  messagingSenderId: "718619004320",
  appId: "1:718619004320:web:9af47d29678bb9be1968c5",
  measurementId: "G-E06SE4F6FP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
