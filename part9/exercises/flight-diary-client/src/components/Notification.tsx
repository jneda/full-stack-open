import { Notification as INotification } from "../types";

interface NotificationProps {
  notification: INotification;
}

const Notification = ({ notification }: NotificationProps) => {
  const { type, message } = notification;

  return <p className={`notification ${type}`}>{message}</p>;
};

export default Notification;
