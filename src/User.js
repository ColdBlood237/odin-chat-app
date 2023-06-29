function User({ userData, handleClick }) {
  return (
    <button
      className="user"
      onClick={() => {
        handleClick(userData);
      }}
    >
      <img
        src={userData.profileURL}
        alt={userData.name}
        className="user-profile-pic"
      ></img>
      <p className="user-name">{userData.name}</p>
    </button>
  );
}

export default User;
