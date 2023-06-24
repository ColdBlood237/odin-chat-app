function UsersList({ users }) {
  console.log(users);
  return (
    <div className="users-wrapper">
      <input type="text" placeholder="Search"></input>
      <div className="users-list">
        {users.map((user) => (
          <button className="user">
            <div className="user-profile-pic"></div>
            <p className="user-name">{user.name}</p>
          </button>
        ))}
      </div>
      <button className="cancel" type="button">
        CANCEL
      </button>
    </div>
  );
}

export default UsersList;
