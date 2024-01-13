import PropTypes from "prop-types";

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`} data-cy="notification">
      {message}
    </div>
  );
};

Notification.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default Notification;
