import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Link as MuiLink,
} from "@mui/material";

const UsersPage = () => {
  const users = useSelector((state) => state.users);

  return (
    <>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell component="th"></TableCell>
              <TableCell component="th">Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <MuiLink component={Link} to={`/users/${user.id}`}>
                    {user.name}
                  </MuiLink>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default UsersPage;
