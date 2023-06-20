// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

function App() {
  return <div className="App"></div>;
}

export default App;
