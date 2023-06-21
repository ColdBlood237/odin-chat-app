function Message({ sender, content }) {
  return (
    <div className={sender === "you" ? "message you" : "message"}>
      <p className="sender">{sender}</p>
      <p className="msg-content">{content}</p>
    </div>
  );
}

export default Message;
