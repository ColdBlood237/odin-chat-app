import { useEffect } from "react";

function RenameChat({ open, setOpen }) {
  useEffect(() => {
    const renameChatPopup = document.querySelector(".rename-chat-popup");
    renameChatPopup.classList.toggle("rename-chat-popup-open");
  }, [open]);

  function closeRenameChatPopup() {
    setOpen(false);
  }
  return (
    <div className="rename-chat-popup">
      <form id="rename-chat-form">
        <input className="chat-name" placeholder="New name"></input>
        <div>
          <button
            className="cancel"
            type="button"
            onClick={closeRenameChatPopup}
          >
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

export default RenameChat;
