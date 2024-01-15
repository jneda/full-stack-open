import { useDispatch, useSelector } from "react-redux";
import { notify } from "../reducers/notificationReducer";
import { setUser } from "../reducers/userReducer";
import blogService from "../services/blogs";

import { Button } from "@mui/material";

const Logout = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = () => {
    const userName = user.name;

    dispatch(setUser(null));
    blogService.setToken(null);
    window.localStorage.removeItem("loggedBlogappUser");

    dispatch(notify(`${userName} logged out.`, "success"));
  };

  return user ? (
    <li>
      <span className="loggedIn">{user.name} logged in</span>
      <Button onClick={handleLogout} variant="outlined" sx={{ ml: 1 }}>
        Log out
      </Button>
    </li>
  ) : null;
};

export default Logout;
