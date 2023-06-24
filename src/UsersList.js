import { useEffect } from "react";
import uniqid from "uniqid";

function UsersList({ users, open }) {
  useEffect(() => {
    const usersWrapper = document.querySelector(".users-wrapper");
    usersWrapper.classList.toggle("userlist-open");
    console.log(usersWrapper);
  }, [open]);

  function closeUserlist() {
    document.querySelector(".users-wrapper").classList.toggle("userlist-open");
  }

  return (
    <div className="users-wrapper">
      <input type="text" placeholder="Search"></input>
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
