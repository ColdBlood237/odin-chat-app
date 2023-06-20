function ChatButton({ title, lastMsg }) {
  return (
    <button className="chat-btn">
      <img alt="chat pic"></img>
      <h4 className="chat-title">{title}</h4>
      <p className="chat-last-msg">
        <span className="msg">{lastMsg.content}</span>
        <span className="time">{lastMsg.time}</span>
      </p>
    </button>
  );
}

export default ChatButton;
