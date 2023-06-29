import {
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";
import { auth, db, provider } from "./firebase";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

function Login() {
  function googleSignIn() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const db = getDatabase();
        set(ref(db, "users/" + user.uid), {
          username: user.displayName,
          profile: user.photoURL,
        });
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      (async () => {
        try {
          await setDoc(doc(db, "users", uid), {
            name: user.displayName,
            profileURL: user.photoURL,
            userID: uid,
          });
          await updateDoc(doc(db, "chats", "test-chat"), {
            participants: arrayUnion(uid),
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })();
    }
  });

  return (
    <div className="login-screen">
      <div className="login-container">
        <img
          alt="letter"
          src="data:image/png;base64,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"
        ></img>
        <h1>Welcome to ChatApp</h1>
        <button onClick={googleSignIn}>SIGN IN WITH GOOGLE</button>
      </div>
    </div>
  );
}

export default Login;
