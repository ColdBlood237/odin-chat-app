import Chat from "./Chat";
import ChatButton from "./ChatButton";
import { Routes, Route, HashRouter, Link } from "react-router-dom";
import UsersList from "./UsersList";

function UI() {
  function openPopup(e) {
    const clickedButton = e.target.closest("button");
    const popup = clickedButton.nextElementSibling;
    popup.classList.toggle("active");
  }

  function closePopups(e) {
    const popups = document.querySelectorAll(".popup");

    Array.from(popups).forEach(function (popup) {
      if (
        popup.classList.contains("active") &&
        !popup.contains(e.target) &&
        !e.target.closest(".popup-btn")
      ) {
        popup.classList.toggle("active");
      }
    });
  }

  function switchTheme() {
    const themeIcon = document.querySelector(".theme-icon");
    if (themeIcon.classList[1] === "fa-moon") {
      themeIcon.classList.replace("fa-moon", "fa-sun");
      document.documentElement.style.cssText = `--section-border: 2px solid #ffffff1f;
        --active-btn-bgcolor: #ffffff29;
        --msg-received-bgcolor: #515151
        `;
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      document.documentElement.style.cssText = `--section-border: 2px solid #f0f0f0;
        --active-btn-bgcolor: #00000014;
        --msg-received-bgcolor: #e6e6e6`;
    }

    document.querySelector(".UI").classList.toggle("dark");
    document.querySelectorAll("i").forEach((icon) => {
      icon.classList.toggle("dark-icon");
    });
    document.querySelectorAll("input").forEach((input) => {
      input.classList.toggle("dark-input");
    });
    document.querySelectorAll("button").forEach((button) => {
      button.classList.toggle("dark-button");
    });
    document.querySelectorAll(".side-text").forEach((text) => {
      text.classList.toggle("dark-side-text");
    });
    document.querySelectorAll(".popup").forEach((popup) => {
      popup.classList.toggle("dark-popup");
    });
    document.querySelector("emoji-picker").classList.toggle("dark");
  }

  function switchActive(e) {
    document.querySelectorAll(".chat-btn").forEach((button) => {
      if (button.classList.contains("active-btn"))
        button.classList.remove("active-btn");
    });
    const thisButton = e.target.closest("button");
    thisButton.classList.add("active-btn");
  }

  ////////////////////// only for UI test purposes ////////////
  const messages = [
    {
      sender: "Web dev #1",
      content: "This is a test",
    },
    {
      sender: "you",
      content: "Okay my buddy",
    },
  ];

  const messages2 = [
    {
      sender: "Web dev #2",
      content: "Test for ohio",
    },
    {
      sender: "you",
      content: "Ohio is poggers",
    },
  ];

  const users = [
    {
      name: "Pathfinder",
    },
    {
      name: "Bangalore",
    },
    {
      name: "Octane",
    },
    {
      name: "Gibraltar",
    },
    {
      name: "Wraith",
    },
    {
      name: "Bloodhound",
    },
  ];

  return (
    <div onClick={closePopups} className="UI">
      <UsersList users={users} />
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="profile-pic"></div>
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
                <button>
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
                <button>
                  <i className="fa-solid fa-user fa-xl"></i> Private
                </button>
                <button>
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
          placeholder="Search chat"
          className="search-chat"
        ></input>
        <div className="chat-btns-wrapper">
          <Link onClick={switchActive} className="chat-link" to="/test-chat">
            <ChatButton
              title={"Test Chat"}
              lastMsg={{ content: "hi", time: "20/06 18:18" }}
            />
          </Link>
          <Link onClick={switchActive} className="chat-link" to="/ohio-be-like">
            <ChatButton
              title={"Ohio be like"}
              lastMsg={{ content: "bruh", time: "22/06 18:33" }}
            />
          </Link>
        </div>
      </div>

      <Routes>
        <Route
          path="/test-chat"
          element={
            <Chat
              messages={messages}
              openPopup={openPopup}
              title={"Test Chat"}
              lastMsg={{ content: "hi", time: "20/06 18:18" }}
            />
          }
        />
        <Route
          path="/ohio-be-like"
          element={
            <Chat
              messages={messages2}
              openPopup={openPopup}
              title={"Ohio be like"}
              lastMsg={{ content: "bruh", time: "22/06 18:33" }}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default UI;
