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
            <button className="sidebar-header-btn">
              <i className="fa-solid fa-moon fa-xl"></i>
            </button>
          </div>
        </div>
        <input type="text" placeholder="Search chat"></input>
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
