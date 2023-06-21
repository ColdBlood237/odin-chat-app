import Chat from "./Chat";
import ChatButton from "./ChatButton";

function UI() {
  return (
    <div className="UI">
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="profile-pic"></div>
          <h1>Chats</h1>
          <div className="sidebar-header-btns">
            <div className="menu-wrapper">
              <button className="sidebar-header-btn">
                <i class="fa-solid fa-ellipsis fa-xl"></i>
              </button>
              <div className="menu-popup">
                <button>
                  <i class="fa-solid fa-gear fa-xl"></i> Preferences
                </button>
                <button>
                  <i class="fa-solid fa-circle-question fa-xl"></i> Help
                </button>
                <button>
                  <i class="fa-solid fa-circle-exclamation fa-xl"></i> Report
                </button>
                <button>
                  <i class="fa-solid fa-right-from-bracket fa-xl"></i> Logout
                </button>
              </div>
            </div>
            <div className="add-chat-wrapper">
              <button className="sidebar-header-btn">
                <i class="fa-solid fa-plus fa-xl"></i>
              </button>
              <div className="add-chat-popup">
                <button>
                  <i class="fa-solid fa-user fa-xl"></i> Private
                </button>
                <button>
                  <i class="fa-solid fa-users fa-xl"></i> Public
                </button>
              </div>
            </div>
            <button className="sidebar-header-btn">
              <i class="fa-solid fa-moon fa-xl"></i>
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
        title={"Test Chat"}
        lastMsg={{ content: "hi", time: "20/06 18:18" }}
      />
    </div>
  );
}

export default UI;
