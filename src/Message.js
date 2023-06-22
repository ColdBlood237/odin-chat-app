function Message({ sender, content }) {
  return (
    <div className={sender === "you" ? "message you" : "message"}>
      <p className="sender side-text">{sender}</p>
      <p
        className={
          sender === "you" ? "msg-content" : "msg-content msg-received"
        }
      >
        {content}
      </p>
    </div>
  );
}

export default Message;
