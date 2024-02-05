import PropTypes from "prop-types";

const Notify = ({ type, message }) => {
  if (!message) return null;

  const color = type === "success" ? "green" : "red";

  return (
    <div
      style={{
        color,
        padding: "1rem",
        border: `2px solid ${color}`,
        borderRadius: "2px",
        marginBlockEnd: "0.6rem",
      }}
    >
      {message}
    </div>
  );
};

Notify.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default Notify;
