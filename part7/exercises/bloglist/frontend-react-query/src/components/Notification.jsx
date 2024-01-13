import { useNotification } from "../hooks/useNotification";

const Notification = () => {
  const notification = useNotification();

  if (!notification) return null;

  const { message, type } = notification;

  return (
    <div className={`notification ${type}`} data-cy="notification">
      {message}
    </div>
  );
};

export default Notification;
