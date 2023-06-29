import { useEffect } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";

let format = require("date-format");

function ChatButton({ chatData, isGroupChat }) {
  const [user] = useAuthState(auth);

  const [lastMessage, setLastMessage] = useState({
    content: "No messages yet.",
  });
  const [lastMessageTime, setLastMessageTime] = useState("");

  useEffect(() => {
    let q;
    let unsubscribe;
    if (chatData.chatID) {
      if (isGroupChat) {
        q = query(
          collection(db, "chats", chatData.chatID, "messages"),
          orderBy("timestamp", "desc"),
          limit(1)
        );
      } else {
        q = query(
          collection(
            db,
            "users",
            user.uid,
            "private_chats",
            chatData.chatID,
            "messages"
          ),
          orderBy("timestamp", "desc"),
          limit(1)
        );
      }
      unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let messages = [];
        QuerySnapshot.forEach((doc) => {
          messages.push(doc.data());
        });
        if (messages[0]) setLastMessage(messages[0]);
      });
    }
    return () => unsubscribe;
  }, []);

  useEffect(() => {
    if (lastMessage && lastMessage.timestamp) {
      setLastMessageTime(
        format("dd/MM hh:mm", new Date(lastMessage.timestamp.seconds * 1000))
      );
    }
  }, [lastMessage]);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.substring(0, maxLength - 3) + "...";
    }
    return text;
  }

  return (
    <button className="chat-btn">
      <img
        className="chat-btn-pic"
        src={
          !!chatData.chatPicURL
            ? chatData.chatPicURL
            : `https://ui-avatars.com/api/?name=${chatData.name}&background=random`
        }
        alt={chatData.name}
      ></img>
      <div>
        <h4 className="chat-title">{chatData.name}</h4>
        <p className="chat-last-msg side-text">
          <span className="msg">
            {lastMessage ? truncateText(lastMessage.content, 30) : ""}
          </span>
          <span className="time">{lastMessageTime}</span>
        </p>
      </div>
    </button>
  );
}

export default ChatButton;
