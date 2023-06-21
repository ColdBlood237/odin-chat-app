import Message from "./Message";
import "emoji-picker-element";

function Chat({ title, lastMsg }) {
  const messages = [
    {
      sender: "Web dev #1",
      content: "This is a test nigga",
    },
    {
      sender: "you",
      content: "Okay my nigga",
    },
  ];

  return (
    <div className="chat">
      <div className="chat-header">
        <div className="chat-pic"></div>
        <div>
          <h3>{title}</h3>
          <p className="last-msg">Last message at {lastMsg.time}</p>
        </div>
        <div className="group-editor-wrapper">
          <button>
            <i class="fa-solid fa-ellipsis fa-xl"></i>
          </button>
          <div className="group-editor-popup">
            <button>
              <i class="fa-solid fa-plus fa-xl"></i> Add person
            </button>
            <button>
              <i class="fa-solid fa-right-from-bracket fa-xl"></i> Leave
            </button>
          </div>
        </div>
      </div>

      <div className="chat-content">
        {messages.map((msg) => (
          <Message sender={msg.sender} content={msg.content} />
        ))}
      </div>

      <div className="msg-form-wrapper">
        <form id="message-form">
          <button type="button">
            <i class="fa-solid fa-face-laugh-beam fa-xl"></i>
          </button>
          <emoji-picker></emoji-picker>
          <input type="text" placeholder="Aa"></input>
          <button type="submit">
            <i class="fa-solid fa-paper-plane fa-xl"></i>
          </button>
        </form>
      </div>
    </div>
  );
}

export default Chat;
