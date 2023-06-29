import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";

function Message({ senderName, senderID, content }) {
  const [user] = useAuthState(auth);
  return (
    <div className={user && senderID === user.uid ? "message you" : "message"}>
      <p className="sender side-text">{senderName}</p>
      <p
        className={
          user && senderID === user.uid
            ? "msg-content"
            : "msg-content msg-received"
        }
      >
        {content}
      </p>
    </div>
  );
}

export default Message;
