import Message from "./Message";
import "emoji-picker-element";
import { useEffect } from "react";
import uniqid from "uniqid";
import insertText from "https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js";
import TextareaAutosize from "react-textarea-autosize";

function Chat({
  openUserlist,
  openRenameChatPopup,
  messages,
  openPopup,
  title,
  lastMsg,
  privacy,
}) {
  useEffect(() => {
    const emojiPicker = document.querySelector("emoji-picker");
    emojiPicker.addEventListener("emoji-click", (e) => {
      insertText(document.querySelector(".msg-input"), e.detail.unicode);
    });
  }, []);

  return (
    <div className="chat">
      <div className="chat-header">
        <img
          className="chat-pic"
          src={`https://ui-avatars.com/api/?name=${title}&background=random`}
          alt="profile"
        ></img>
        <div>
          <h3>{title}</h3>
          <p className="last-msg side-text">Last message at {lastMsg.time}</p>
        </div>
        <div className="group-editor-wrapper">
          <button onClick={openPopup} className="popup-btn">
            <i className="fa-solid fa-ellipsis fa-xl"></i>
          </button>
          <div className="group-editor-popup popup">
            {privacy.public ? (
              <>
                <button onClick={openUserlist}>
                  <i className="fa-solid fa-plus fa-xl"></i> Add person
                </button>
                <button onClick={openRenameChatPopup}>
                  <i class="fa-solid fa-pen"></i> Rename
                </button>
                {privacy.mine ? (
                  <button>
                    <i className="fa-solid fa-right-from-bracket fa-xl"></i>{" "}
                    Leave
                  </button>
                ) : (
                  <button>
                    <i class="fa-solid fa-trash"></i> Delete
                  </button>
                )}
              </>
            ) : (
              <>
                <button>
                  <i class="fa-solid fa-ban"></i> Block
                </button>
                <button>
                  <i class="fa-solid fa-trash"></i> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-content">
          {messages.map((msg) => (
            <Message key={uniqid()} sender={msg.sender} content={msg.content} />
          ))}
        </div>
      </div>

      <div className="msg-form-wrapper">
        <form id="message-form">
          <div className="emoji-wrapper">
            <button
              onClick={openPopup}
              type="button"
              className="emoji-btn popup-btn"
            >
              <i className="fa-solid fa-face-laugh-beam fa-xl"></i>
            </button>
            <emoji-picker class="light popup"></emoji-picker>
          </div>
          <input
            className="msg-input"
            type="text"
            placeholder="Aa"
            rows={1}
            required
          ></input>

          <button type="submit">
            <i className="fa-solid fa-paper-plane fa-xl"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
