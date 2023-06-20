import Chat from "./Chat";
import ChatButton from "./ChatButton";

function UI() {
  return (
    <div className="UI">
      <div className="sidebar">
        <img alt="profle picture" src=""></img>
        <h1>Chats</h1>
        <div className="menu-wrapper">
          <button>
            <i class="fa-solid fa-ellipsis"></i>
          </button>
          <div>
            <button>
              <i class="fa-solid fa-gear"></i> Preferences
            </button>
            <button>
              <i class="fa-solid fa-circle-question"></i> Help
            </button>
            <button>
              <i class="fa-solid fa-circle-exclamation"></i> Report
            </button>
            <button>
              <i class="fa-solid fa-right-from-bracket"></i> Logout
            </button>
          </div>
        </div>
        <div className="add-chat-wrapper">
          <button>
            <i class="fa-solid fa-plus"></i>
          </button>
          <div>
            <button>
              <i class="fa-solid fa-user"></i> Private
            </button>
            <button>
              <i class="fa-solid fa-users"></i> Public
            </button>
          </div>
        </div>
        <button>
          <i class="fa-solid fa-moon"></i>
        </button>
        <input type="text" placeholder="Search chat"></input>
        <ChatButton
          title={"Test Chat"}
          lastMsg={{ content: "hi", time: "20/06 18:18" }}
        />
        <Chat />
      </div>
    </div>
  );
}

export default UI;
