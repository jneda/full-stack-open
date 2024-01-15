import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { TableRow, TableCell, Link as MuiLink } from "@mui/material";

const BlogLink = ({ blog }) => {
  return (
    <TableRow
      className="blog"
      data-cy="blog-item"
      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
    >
      <TableCell className="blogEntry" component="th" scope="row">
        <MuiLink component={Link} to={`/blogs/${blog.id}`} data-cy="blog-title">
          {blog.title}
        </MuiLink>
      </TableCell>
      <TableCell className="author">by {blog.author}</TableCell>
    </TableRow>
  );
};

BlogLink.propTypes = {
  blog: PropTypes.object,
};

export default BlogLink;
