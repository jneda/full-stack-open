import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return null;

  const { type, message } = notification;

  return (
    <div className={`notification ${type}`} data-cy="notification">
      {message}
    </div>
  );
};

export default Notification;
