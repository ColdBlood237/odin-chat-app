import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCwY9_tM3relkZey1qH3qDU_61ir1COGw",
  authDomain: "odin-chat-app.firebaseapp.com",
  projectId: "odin-chat-app",
  storageBucket: "odin-chat-app.appspot.com",
  messagingSenderId: "789887361577",
  appId: "1:789887361577:web:e58066ccc4784ba9753238",
  databaseURL:
    "https://odin-chat-app-default-rtdb.europe-west1.firebasedatabase.app/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
