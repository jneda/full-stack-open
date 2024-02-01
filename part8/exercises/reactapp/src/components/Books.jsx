import PropTypes from "prop-types";
import { useQuery, NetworkStatus } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import GenresFilter from "./GenresFilter";

const Books = (props) => {
  const query = useQuery(ALL_BOOKS, { variables: { genres: null } });

  if (!props.show) {
    return null;
  }

  if (query.loading || query.networkStatus === NetworkStatus.refresh)
    return <div>Loading...</div>;

  return (
    <div>
      <h2>Books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {query.data.allBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <GenresFilter booksQuery={query} />
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool,
};

export default Books;
