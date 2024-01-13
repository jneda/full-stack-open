import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

export const useNotification = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotify = () => {
  const [, notificationDispatch] = useContext(NotificationContext);

  return (message, type) => {
    notificationDispatch({
      type: "SET_MESSAGE",
      payload: { message, type },
    });
    setTimeout(
      () =>
        notificationDispatch({
          type: "SET_MESSAGE",
          payload: null,
        }),
      5000,
    );
  };
};
