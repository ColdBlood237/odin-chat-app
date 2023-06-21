function ChatButton({ title, lastMsg }) {
  return (
    <button className="chat-btn">
      <div className="chat-btn-pic"></div>
      <div>
        <h4 className="chat-title">{title}</h4>
        <p className="chat-last-msg">
          <span className="msg">{lastMsg.content}</span>
          <span className="time">{lastMsg.time}</span>
        </p>
      </div>
    </button>
  );
}

export default ChatButton;
