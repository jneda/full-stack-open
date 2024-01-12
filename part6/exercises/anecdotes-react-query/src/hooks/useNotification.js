import { useContext } from "react";
import NotificationContext from "../contexts/NotificationContext";

export const setNotificationMessage = (message) => {
  return {
    type: "SET_MESSAGE",
    payload: message,
  };
};

export const useNotificationMessage = () => {
  const [notification] = useContext(NotificationContext);
  return notification;
};

export const useNotificationDispatch = () => {
  const [, dispatch] = useContext(NotificationContext);
  return dispatch;
};
