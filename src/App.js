import { useEffect } from "react";
import Header from "./components/Header";
import Body from "./components/Body";
import Login from "./components/Login";
import BodyAside from "./components/BodyAside";
import { useAuthState } from "react-firebase-hooks/auth";
import db, { auth } from "./firebase";
function App() {
  const [user] = useAuthState(auth);
  const userName = user?.displayName.replace(" ", ".").toLowerCase();

  useEffect(() => {
    if (user) {
      db.collection("users").doc(user?.uid).set(
        {
          id: user?.uid,
          displayName: user?.displayName,
          photoURL: user?.photoURL,
          userName,
        },
        { merge: true }
      );
    }
  }, [user]);

  return (
    <>
      {!user ? (
        <Login></Login>
      ) : (
        <div className="app">
          <Header></Header>
          <Body></Body>
        </div>
      )}
    </>
  );
}

export default App;
