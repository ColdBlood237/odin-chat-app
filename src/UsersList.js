import { useEffect, useState } from "react";
import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import User from "./User";

function UsersList({ users, chatData, open, setOpen }) {
  const [user] = useAuthState(auth);
  const [usersNotInChat, setUsersNotInChat] = useState([]);
  const [searchUserValue, setSearchUserValue] = useState("");

  useEffect(() => {
    const usersWrapper = document.querySelector(".users-wrapper");
    usersWrapper.classList.toggle("userlist-open");
  }, [open]);

  useEffect(() => {
    if (chatData !== null) {
      setUsersNotInChat(
        users.filter((u) => !chatData.participants.includes(u.userID))
      );
    }
  }, [users, chatData]);

  function closeUserlist() {
    setOpen(false);
  }

  async function createPrivateChat(receiver) {
    console.log("clicked on user");
    await setDoc(doc(db, "users", user.uid, "private_chats", receiver.userID), {
      chatID: receiver.userID,
      chatPicURL: receiver.profileURL,
      name: receiver.name,
      created_at: serverTimestamp(),
      public: false,
    });
    await setDoc(doc(db, "users", receiver.userID, "private_chats", user.uid), {
      chatID: user.uid,
      chatPicURL: user.photoURL,
      name: user.displayName,
      created_at: serverTimestamp(),
      public: false,
    });
  }

  async function addUserToGroup(newUser) {
    await updateDoc(doc(db, "chats", chatData.chatID), {
      participants: arrayUnion(newUser.userID),
    });
    console.log("user added to the chat ", chatData.chatID);
    closeUserlist();
  }

  function searchUser() {
    const filter = searchUserValue.toUpperCase();
    const li = document.querySelectorAll(".user-li");

    for (let i = 0; i < li.length; i++) {
      const userName = li[i].querySelector(".user-name");
      const userNameText = userName.textContent || userName.innerText;
      if (userNameText.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "";
      } else {
        li[i].style.display = "none";
      }
    }
  }

  return (
    <div className="users-wrapper">
      <input
        className="search-user"
        onKeyUp={searchUser}
        value={searchUserValue}
        onChange={(e) => {
          setSearchUserValue(e.target.value);
        }}
        type="text"
        placeholder="Search"
      ></input>
      <ul className="users-list">
        {users[0] !== undefined ? (
          chatData === null ? (
            users.map((u) => (
              <li key={u.userID} className="user-li">
                <User userData={u} handleClick={createPrivateChat} />
              </li>
            ))
          ) : (
            usersNotInChat.map((u) => (
              <li key={u.userID} className="user-li">
                <User userData={u} handleClick={addUserToGroup} />
              </li>
            ))
          )
        ) : (
          <></>
        )}
      </ul>
      <button onClick={closeUserlist} className="cancel" type="button">
        CANCEL
      </button>
    </div>
  );
}

export default UsersList;
