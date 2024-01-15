import { Link } from "react-router-dom";
import Logout from "./Logout";

import { AppBar, Button, IconButton } from "@mui/material";
import ToolBar from "@mui/material/Toolbar";
import MenuIcon from "@mui/icons-material/Menu";

const Navigation = () => {
  return (
    <AppBar style={{ fontFamily: "Roboto" }} position="static">
      <ToolBar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        <Button color="primary" variant="text" sx={{ mr: 2 }}>
          <Link to="/" data-cy="home-link">
            Blogs
          </Link>
        </Button>
        <Button color="primary" variant="text" sx={{ mr: 2 }}>
          <Link component={Link} to="/users">
            Users
          </Link>
        </Button>
        <Logout />
      </ToolBar>
    </AppBar>
  );
};

export default Navigation;
