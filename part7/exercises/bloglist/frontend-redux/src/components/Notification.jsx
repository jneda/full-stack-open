import { useSelector } from "react-redux";
import Alert from "@mui/material/Alert";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (!notification) return null;

  const { type, message } = notification;

  return (
    <Alert
      severity={type}
      className={`notification ${type}`}
      data-cy="notification"
    >
      {message}
    </Alert>
  );
};

export default Notification;
