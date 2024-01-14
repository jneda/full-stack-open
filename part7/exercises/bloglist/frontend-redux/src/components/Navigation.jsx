import { Link } from "react-router-dom";
import Logout from "./Logout";

const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Blogs</Link>
        </li>
        <li>
          <Link to="/users">Users</Link>
        </li>
        <Logout />
      </ul>
    </nav>
  );
};

export default Navigation;
