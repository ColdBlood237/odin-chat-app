import Chat from "./Chat";
import ChatButton from "./ChatButton";
import { Routes, Route, Link } from "react-router-dom";
import UsersList from "./UsersList";
import { useEffect, useState } from "react";
import NewChat from "./NewChat";
import RenameChat from "./RenameChat";
import { auth, db } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

function UI({ signOut }) {
  const [user] = useAuthState(auth);

  const [usersListOpen, setUsersListOpen] = useState(false);
  const [newChatPopupOpen, setNewChatPopupOpen] = useState(false);
  const [renameChatPopupOpen, setRenameChatPopupOpen] = useState(false);
  const [searchChatValue, setSearchChatValue] = useState("");
  const [chatData, setChatData] = useState(null);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState([]);
  const [privateChats, setPrivateChats] = useState([]);

  useEffect(() => {
    const unsubscribeChats = onSnapshot(
      query(collection(db, "chats"), orderBy("name", "asc")),
      (snapshot) => {
        const chatsTheUserHasAccessTo = snapshot.docs.filter((doc) =>
          doc.data().participants.includes(user.uid)
        );
        setChats(chatsTheUserHasAccessTo.map((doc) => doc.data()));
      }
    );
    const unsubscribeUsers = onSnapshot(
      query(collection(db, "users"), orderBy("name", "asc")),
      (snapshot) => {
        const usersOtherThanMe = snapshot.docs.filter(
          (doc) => doc.data().userID !== user.uid
        );
        setUsers(usersOtherThanMe.map((doc) => doc.data()));
      }
    );
    const unsubscribePrivateChats = onSnapshot(
      query(
        collection(db, "users", user.uid, "private_chats"),
        orderBy("name", "asc")
      ),
      (snapshot) => {
        setPrivateChats(snapshot.docs.map((doc) => doc.data()));
      }
    );

    return () => {
      unsubscribeChats();
      unsubscribeUsers();
      unsubscribePrivateChats();
    };
  }, [user]);

  function openPopup(e) {
    const clickedButton = e.target.closest("button");
    const popup = clickedButton.nextElementSibling;
    popup.classList.toggle("active");
  }

  function openUserlist(chatData) {
    setChatData(chatData);
    setUsersListOpen(true);
  }

  function openNewChatPopup() {
    setNewChatPopupOpen(true);
  }

  function openRenameChatPopup(chatData) {
    setChatData(chatData);
    setRenameChatPopupOpen(true);
  }

  function closePopups(e) {
    const popups = document.querySelectorAll(".popup");
    const usersWrapper = document.querySelector(".users-wrapper");
    const newChatPopup = document.querySelector(".new-chat-popup");
    const renameChatPopup = document.querySelector(".rename-chat-popup");

    Array.from(popups).forEach(function (popup) {
      if (
        popup.classList.contains("active") &&
        !e.target.closest(".popup-btn")
      ) {
        popup.classList.toggle("active");
      }
    });

    if (
      usersWrapper.classList.contains("userlist-open") &&
      !usersWrapper.contains(e.target) &&
      !e.target.closest(".userlist-btn")
    ) {
      setUsersListOpen(false);
    }

    if (
      newChatPopup.classList.contains("new-chat-popup-open") &&
      !newChatPopup.contains(e.target) &&
      !e.target.closest(".new-chat-btn")
    ) {
      setNewChatPopupOpen(false);
    }

    if (
      renameChatPopup.classList.contains("rename-chat-popup-open") &&
      !renameChatPopup.contains(e.target) &&
      !e.target.closest(".rename-chat-btn")
    ) {
      setRenameChatPopupOpen(false);
    }
  }

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme")
      ? localStorage.getItem("theme")
      : null;

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme);

      if (currentTheme === "dark") {
        const themeIcon = document.querySelector(".theme-icon");
        themeIcon.classList.replace("fa-moon", "fa-sun");
      }
    }
  }, []);

  function switchTheme() {
    const themeIcon = document.querySelector(".theme-icon");
    const emojiPicker = document.querySelector("emoji-picker");
    if (themeIcon.classList[1] === "fa-moon") {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      document.documentElement.setAttribute("data-theme", "dark");
      emojiPicker.style.setProperty("--background", "#303030");
      localStorage.setItem("theme", "dark");
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      document.documentElement.setAttribute("data-theme", "light");
      emojiPicker.style.setProperty("--background", "#ffffff");
      localStorage.setItem("theme", "light");
    }
  }

  function switchActiveChat(e) {
    document.querySelectorAll(".chat-btn").forEach((button) => {
      if (button.classList.contains("active-btn"))
        button.classList.remove("active-btn");
    });
    const thisButton = e.target.closest("button");
    thisButton.classList.add("active-btn");
  }

  function searchChat() {
    const filter = searchChatValue.toUpperCase();
    const li = document.querySelectorAll(".chat-button-li");

    for (let i = 0; i < li.length; i++) {
      const chatTitle = li[i].querySelector(".chat-title");
      const chatTitleText = chatTitle.textContent || chatTitle.innerText;
      if (chatTitleText.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  return (
    <div onClick={closePopups} className="UI">
      <UsersList
        users={users}
        chatData={chatData}
        open={usersListOpen}
        setOpen={setUsersListOpen}
      />
      <NewChat open={newChatPopupOpen} setOpen={setNewChatPopupOpen} />
      <RenameChat
        chatData={chatData}
        open={renameChatPopupOpen}
        setOpen={setRenameChatPopupOpen}
      />
      <div className="sidebar">
        <div className="sidebar-header">
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="profile-pic"
          ></img>
          <h1>Chats</h1>
          <div className="sidebar-header-btns">
            <div className="menu-wrapper">
              <button
                onClick={openPopup}
                className="sidebar-header-btn popup-btn"
              >
                <i className="fa-solid fa-ellipsis fa-xl"></i>
              </button>
              <div className="menu-popup popup">
                <button disabled>
                  <i className="fa-solid fa-gear fa-xl"></i> Preferences
                </button>
                <button disabled>
                  <i className="fa-solid fa-circle-question fa-xl"></i> Help
                </button>
                <button disabled>
                  <i className="fa-solid fa-circle-exclamation fa-xl"></i>{" "}
                  Report
                </button>
                <button onClick={signOut}>
                  <i className="fa-solid fa-right-from-bracket fa-xl"></i>{" "}
                  Logout
                </button>
              </div>
            </div>
            <div className="add-chat-wrapper">
              <button
                onClick={openPopup}
                className="sidebar-header-btn popup-btn"
              >
                <i className="fa-solid fa-plus fa-xl"></i>
              </button>
              <div className="add-chat-popup popup">
                <button
                  className="userlist-btn"
                  onClick={() => {
                    openUserlist(null);
                  }}
                >
                  <i className="fa-solid fa-user fa-xl "></i> Private
                </button>
                <button className="new-chat-btn" onClick={openNewChatPopup}>
                  <i className="fa-solid fa-users fa-xl"></i> Public
                </button>
              </div>
            </div>
            <button
              onClick={switchTheme}
              className="sidebar-header-btn theme-btn"
            >
              <i className="fa-solid fa-moon fa-xl theme-icon"></i>
            </button>
          </div>
        </div>
        <input
          type="text"
          onKeyUp={searchChat}
          value={searchChatValue}
          onChange={(e) => {
            setSearchChatValue(e.target.value);
          }}
          placeholder="Search chat"
          className="search-chat"
        ></input>

        <ul className="chat-btns-wrapper" id="chat-buttons-list">
          {chats.map((chat) => (
            <li key={chat.chatID} className="chat-button-li">
              <Link
                onClick={switchActiveChat}
                className="chat-link"
                to={chat.name + "-" + chat.chatID.substring(0, 4)}
              >
                <ChatButton chatData={chat} isGroupChat={true} />
              </Link>
            </li>
          ))}
          {privateChats.map((chat) => (
            <li key={chat.chatID} className="chat-button-li">
              <Link
                onClick={switchActiveChat}
                className="chat-link"
                to={chat.name + "-" + chat.chatID.substring(0, 4)}
              >
                <ChatButton chatData={chat} isGroupChat={false} />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Routes>
        {chats.map((chat) => (
          <Route
            key={chat.chatID}
            path={chat.name + "-" + chat.chatID.substring(0, 4)}
            element={
              <Chat
                openUserlist={openUserlist}
                openRenameChatPopup={openRenameChatPopup}
                openPopup={openPopup}
                chatData={chat}
                isGroupChat={true}
              />
            }
          />
        ))}
        {privateChats.map((chat) => (
          <Route
            key={chat.chatID}
            path={chat.name + "-" + chat.chatID.substring(0, 4)}
            element={
              <Chat
                openUserlist={openUserlist}
                openRenameChatPopup={openRenameChatPopup}
                openPopup={openPopup}
                chatData={chat}
                isGroupChat={false}
              />
            }
          />
        ))}
        <Route path="*" element={<div className="chat"></div>} />
      </Routes>
    </div>
  );
}

export default UI;
