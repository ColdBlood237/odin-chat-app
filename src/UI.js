import Chat from "./Chat";
import ChatButton from "./ChatButton";

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
      document.documentElement.style.cssText =
        "--section-border: 2px solid #ffffff1f";
    } else {
      themeIcon.classList.replace("fa-sun", "fa-moon");
      document.documentElement.style.cssText =
        "--section-border: 2px solid #f0f0f0";
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
    document.querySelectorAll(".msg-received").forEach((msg) => {
      msg.classList.toggle("dark-msg-received");
    });
    document.querySelectorAll(".popup").forEach((popup) => {
      popup.classList.toggle("dark-popup");
    });
    document.querySelector("emoji-picker").classList.toggle("dark");
  }

  return (
    <div onClick={closePopups} className="UI">
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
        <ChatButton
          title={"Test Chat"}
          lastMsg={{ content: "hi", time: "20/06 18:18" }}
        />
      </div>

      <Chat
        openPopup={openPopup}
        title={"Test Chat"}
        lastMsg={{ content: "hi", time: "20/06 18:18" }}
      />
    </div>
  );
}

export default UI;
