import { useSelector } from "react-redux";
import BlogLink from "./BlogLink";

import { TableContainer, Table, TableBody, Paper } from "@mui/material";

const Blogs = () => {
  const blogs = useSelector((state) => state.blogs);
  const user = useSelector((state) => state.user);

  const descendingLikesSort = (blogA, blogB) => blogB.likes - blogA.likes;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small">
        <TableBody data-cy="blogs-list">
          {blogs
            .slice()
            .sort(descendingLikesSort)
            .map((blog) => (
              <BlogLink key={blog.id} blog={blog} user={user} />
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Blogs;
