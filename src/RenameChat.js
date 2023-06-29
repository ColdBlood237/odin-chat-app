import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "./firebase";

function RenameChat({ chatData, open, setOpen }) {
  const [newChatName, setNewChatName] = useState("");

  useEffect(() => {
    const renameChatPopup = document.querySelector(".rename-chat-popup");
    renameChatPopup.classList.toggle("rename-chat-popup-open");
  }, [open]);

  function closeRenameChatPopup() {
    setOpen(false);
  }

  async function renameChat(e) {
    e.preventDefault();
    await updateDoc(doc(db, "chats", chatData.chatID), {
      name: newChatName,
    });
    closeRenameChatPopup();
    setNewChatName("");
  }

  return (
    <div className="rename-chat-popup">
      <form onSubmit={renameChat} id="rename-chat-form">
        <input
          value={newChatName}
          onChange={(e) => {
            setNewChatName(e.target.value);
          }}
          className="chat-name"
          placeholder="New name"
          required
        ></input>
        <div>
          <button
            className="cancel"
            type="button"
            onClick={closeRenameChatPopup}
          >
            CANCEL
          </button>
          <button className="create" type="submit">
            RENAME
          </button>
        </div>
      </form>
    </div>
  );
}

export default RenameChat;
