import { Link } from "react-router-dom";
import Logout from "./Logout";

import { Link as MuiLink, List, ListItem } from "@mui/material";

const Navigation = () => {
  return (
    <nav style={{ fontFamily: "Roboto" }}>
      <List>
        <ListItem>
          <MuiLink component={Link} to="/" data-cy="home-link">
            Blogs
          </MuiLink>
        </ListItem>
        <ListItem>
          <MuiLink component={Link} to="/users">
            Users
          </MuiLink>
        </ListItem>
        <Logout />
      </List>
    </nav>
  );
};

export default Navigation;
