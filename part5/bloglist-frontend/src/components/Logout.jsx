const Logout = ({ user, onLogout }) => {
  return (
    <>
      <span>{user.name} logged in</span>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

export default Logout;
