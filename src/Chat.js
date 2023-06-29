import Message from "./Message";
import "emoji-picker-element";
import { useEffect, useState, useRef } from "react";
import uniqid from "uniqid";
import insertText from "https://cdn.jsdelivr.net/npm/insert-text-at-cursor@0.3.0/index.js";
import {
  addDoc,
  collection,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
  limit,
  deleteDoc,
  doc,
  updateDoc,
  arrayRemove,
} from "firebase/firestore";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

let format = require("date-format");

function Chat({
  openUserlist,
  openRenameChatPopup,
  openPopup,
  chatData,
  isGroupChat,
}) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [lastMessageTime, setLastMessageTime] = useState();
  const [user] = useAuthState(auth);
  const scroll = useRef();

  useEffect(() => {
    const emojiPicker = document.querySelector("emoji-picker");
    emojiPicker.addEventListener("emoji-click", (e) => {
      insertText(document.querySelector(".msg-input"), e.detail.unicode);
    });
  }, []);

  useEffect(() => {
    if (isGroupChat) {
      const q = query(
        collection(db, "chats", chatData.chatID, "messages"),
        orderBy("timestamp", "desc"),
        limit(50)
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let msgs = [];
        QuerySnapshot.forEach((doc) => {
          msgs.push({ ...doc.data(), id: doc.id });
        });

        setMessages(msgs.reverse());
      });
      return () => unsubscribe;
    } else {
      const q = query(
        collection(
          db,
          "users",
          user.uid,
          "private_chats",
          chatData.chatID,
          "messages"
        ),
        orderBy("timestamp", "desc"),
        limit(50)
      );
      const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
        let msgs = [];
        QuerySnapshot.forEach((doc) => {
          msgs.push({ ...doc.data(), id: doc.id });
        });
        setMessages(msgs.reverse());
      });
      return () => unsubscribe;
    }
  }, []);

  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].timestamp) {
      setLastMessageTime(
        format(
          "dd/MM hh:mm",
          new Date(messages[messages.length - 1].timestamp.seconds * 1000)
        )
      );
    }
  }, [messages]);

  async function sendMessage(e) {
    e.preventDefault();
    const { uid, displayName } = auth.currentUser;

    if (isGroupChat) {
      await addDoc(collection(db, "chats", chatData.chatID, "messages"), {
        content: message,
        senderName: displayName,
        senderID: uid,
        timestamp: serverTimestamp(),
      });
    } else {
      await addDoc(
        collection(
          db,
          "users",
          uid,
          "private_chats",
          chatData.chatID,
          "messages"
        ),
        {
          content: message,
          senderName: displayName,
          senderID: uid,
          timestamp: serverTimestamp(),
        }
      );
      await addDoc(
        collection(
          db,
          "users",
          chatData.chatID,
          "private_chats",
          uid,
          "messages"
        ),
        {
          content: message,
          senderName: displayName,
          senderID: uid,
          timestamp: serverTimestamp(),
        }
      );
    }

    setMessage("");
    scroll.current.scrollIntoView({ behavior: "smooth" });
  }

  async function deleteGroup() {
    await deleteDoc(doc(db, "chats", chatData.chatID));
  }

  async function deletePrivateChat() {
    await deleteDoc(
      doc(db, "users", user.uid, "private_chats", chatData.chatID)
    );
  }

  async function leaveChat() {
    await updateDoc(doc(db, "chats", chatData.chatID), {
      participants: arrayRemove(user.uid),
    });
  }

  return (
    <div className="chat">
      <div className="chat-header">
        <img
          className="chat-pic"
          src={
            isGroupChat
              ? `https://ui-avatars.com/api/?name=${chatData.name}&background=random`
              : chatData.chatPicURL
          }
          alt="profile"
        ></img>
        <div>
          <h3>{chatData.name}</h3>
          <p className="last-msg side-text">
            {lastMessageTime
              ? `Last message at ${lastMessageTime}`
              : "No messages yet"}
          </p>
        </div>
        <div className="group-editor-wrapper">
          <button onClick={openPopup} className="popup-btn">
            <i className="fa-solid fa-ellipsis fa-xl"></i>
          </button>
          <div className="group-editor-popup popup">
            {isGroupChat ? (
              <>
                <button
                  onClick={() => {
                    openUserlist(chatData);
                  }}
                >
                  <i className="fa-solid fa-plus fa-xl"></i> Add person
                </button>
                {chatData.ownerID === user.uid ? (
                  <>
                    <button
                      onClick={() => {
                        openRenameChatPopup(chatData);
                      }}
                    >
                      <i className="fa-solid fa-pen"></i> Rename
                    </button>
                    <button onClick={deleteGroup}>
                      <i className="fa-solid fa-trash"></i> Delete
                    </button>
                  </>
                ) : (
                  <button onClick={leaveChat}>
                    <i className="fa-solid fa-right-from-bracket fa-xl"></i>{" "}
                    Leave
                  </button>
                )}
              </>
            ) : (
              <>
                <button>
                  <i className="fa-solid fa-ban"></i> Block
                </button>
                <button onClick={deletePrivateChat}>
                  <i className="fa-solid fa-trash"></i> Delete
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="chat-container">
        <div className="chat-content">
          {!!messages ? (
            messages.map((msg) => (
              <Message
                key={uniqid()}
                senderName={msg.senderName}
                senderID={msg.senderID}
                content={msg.content}
              />
            ))
          ) : (
            <></>
          )}
          <span ref={scroll}></span>
        </div>
      </div>

      <div className="msg-form-wrapper">
        <form onSubmit={sendMessage} id="message-form">
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
            value={message}
            onChange={(e) => setMessage(e.target.value)}
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
