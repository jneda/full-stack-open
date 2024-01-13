import PropTypes from "prop-types";

const Logout = ({ user, onLogout }) => {
  return (
    <>
      <span className="loggedIn">{user.name} logged in</span>
      <button onClick={onLogout}>Log out</button>
    </>
  );
};

Logout.propTypes = {
  user: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
};

export default Logout;
