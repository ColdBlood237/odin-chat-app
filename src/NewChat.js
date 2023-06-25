import { useEffect } from "react";

function NewChat({ open, setOpen }) {
  useEffect(() => {
    const newChatPopup = document.querySelector(".new-chat-popup");
    newChatPopup.classList.toggle("new-chat-popup-open");
  }, [open]);

  function closeNewChatPopup() {
    setOpen(false);
  }
  return (
    <div className="new-chat-popup">
      <form id="new-chat-form">
        <input className="chat-name" placeholder="Chat name"></input>
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
