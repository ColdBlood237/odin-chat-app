import { useEffect } from "react";
import uniqid from "uniqid";

function UsersList({ users, open, setOpen }) {
  useEffect(() => {
    const usersWrapper = document.querySelector(".users-wrapper");
    usersWrapper.classList.toggle("userlist-open");
    console.log(usersWrapper);
  }, [open]);

  function closeUserlist() {
    setOpen(false);
  }

  return (
    <div className="users-wrapper">
      <input className="search-user" type="text" placeholder="Search"></input>
      <div className="users-list">
        {users.map((user) => (
          <button key={uniqid()} className="user">
            <div className="user-profile-pic"></div>
            <p className="user-name">{user.name}</p>
          </button>
        ))}
      </div>
      <button onClick={closeUserlist} className="cancel" type="button">
        CANCEL
      </button>
    </div>
  );
}

export default UsersList;
