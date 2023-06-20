import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, onAuthStateChanged } from "firebase/auth";
import Login from "./Login";
import { useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCwY9_tM3relkZey1qH3qDU_61ir1COGw",
  authDomain: "odin-chat-app.firebaseapp.com",
  projectId: "odin-chat-app",
  storageBucket: "odin-chat-app.appspot.com",
  messagingSenderId: "789887361577",
  appId: "1:789887361577:web:e58066ccc4784ba9753238",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

function App() {
  const [signedIn, setSignedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setSignedIn(true);
      // ...
    } else {
      // User is signed out
      // ...
      setSignedIn(false);
    }
  });

  return signedIn ? (
    <>I'm in pog !</>
  ) : (
    <Login auth={auth} provider={provider} />
  );
}

export default App;
