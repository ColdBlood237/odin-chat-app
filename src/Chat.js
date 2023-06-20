import Message from "./Message";
import "emoji-picker-element";

function Chat() {
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
        <img alt="chat pic" src=""></img>
        <h3>{}</h3>
        <p>Last message at {}</p>
      </div>
      <div className="chat-content">
        {messages.map((msg) => (
          <Message sender={msg.sender} content={msg.content} />
        ))}
      </div>
      <form id="message-form">
        <button type="button">
          <i class="fa-solid fa-face-laugh-beam"></i>
        </button>
        <emoji-picker></emoji-picker>

        <input type="text" placeholder="Aa"></input>
        <button type="submit">
          <i class="fa-solid fa-paper-plane"></i>
        </button>
      </form>
    </div>
  );
}

export default Chat;
