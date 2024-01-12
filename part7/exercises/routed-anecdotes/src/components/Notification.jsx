import PropTypes from "prop-types";

const Notification = ({ message }) => {
  return message ? <p className="notification">{message}</p> : null;
};

Notification.propTypes = {
  message: PropTypes.string,
};

export default Notification;
