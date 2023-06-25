function ChatButton({ title, lastMsg }) {
  return (
    <button className="chat-btn">
      {/* <div className="chat-btn-pic"></div> */}
      <img
        className="chat-btn-pic"
        src={`https://ui-avatars.com/api/?name=${title}&background=random`}
        alt="profile "
      ></img>
      <div>
        <h4 className="chat-title">{title}</h4>
        <p className="chat-last-msg side-text">
          <span className="msg">{lastMsg.content}</span>
          <span className="time">{lastMsg.time}</span>
        </p>
      </div>
    </button>
  );
}

export default ChatButton;
