const Logout = ({ user, onLogout }) => {
  return (
    <>
      <span className="loggedIn">{user.name} logged in</span>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

export default Logout;
