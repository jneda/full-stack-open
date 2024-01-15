import { useSelector } from "react-redux";

import { List, ListItem, Paper } from "@mui/material";

const UserPage = ({ userId }) => {
  const user = useSelector((state) => {
    if (!userId) return null;
    return state.users.find((user) => user.id === userId);
  });

  return user ? (
    <>
      <h2 style={{ fontFamily: "Roboto" }}>{user.name}</h2>
      <h3 style={{ fontFamily: "Roboto" }}>Added blogs:</h3>
      <List component={Paper} dense={true} style={{ fontFamily: "Roboto" }}>
        {user.blogs.map((blog) => (
          <ListItem key={blog.id}>{blog.title}</ListItem>
        ))}
      </List>
    </>
  ) : null;
};

export default UserPage;
