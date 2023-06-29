import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./Login";
import UI from "./UI";

function App() {
  const [user, loading] = useAuthState(auth);

  function signOut() {
    if (auth.currentUser) {
      auth.signOut();
    }
  }

  if (loading) {
    return <div className="loading-screen">loading...</div>;
  }

  return user ? <UI signOut={signOut} /> : <Login />;
}

export default App;
