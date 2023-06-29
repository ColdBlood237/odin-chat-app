import { useEffect } from "react";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { useState } from "react";

function NewChat({ open, setOpen }) {
  const [chatName, setChatName] = useState("");
  const [user] = useAuthState(auth);

  useEffect(() => {
    const newChatPopup = document.querySelector(".new-chat-popup");
    newChatPopup.classList.toggle("new-chat-popup-open");
  }, [open]);

  function closeNewChatPopup() {
    setOpen(false);
  }

  async function createNewChat(e) {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "chats"), {
      name: chatName,
      ownerID: user.uid,
      participants: [user.uid],
    });
    await updateDoc(docRef, {
      chatID: docRef.id,
    });

    closeNewChatPopup();
    setChatName("");
  }

  return (
    <div className="new-chat-popup">
      <form id="new-chat-form" onSubmit={createNewChat}>
        <input
          value={chatName}
          onChange={(e) => {
            setChatName(e.target.value);
          }}
          className="chat-name"
          placeholder="Chat name"
          required
        ></input>
        <div>
          <button className="cancel" type="button" onClick={closeNewChatPopup}>
            CANCEL
          </button>
          <button className="create" type="submit">
            CREATE
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewChat;
