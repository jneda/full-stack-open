import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../queries";

const Recommendations = ({ show }) => {
  const bookQuery = useQuery(ALL_BOOKS);
  const meQuery = useQuery(ME);

  if (!show) return null;

  if (bookQuery.loading || meQuery.loading) return <div>Loading...</div>;

  const filteredBooks = bookQuery.data.allBooks.filter((book) =>
    book.genres.includes(meQuery.data.me.favoriteGenre)
  );

  return (
    <div>
      <h2>Recommendations</h2>
      <p>
        Books in your favorite genre <strong>{meQuery.data.me.favoriteGenre}</strong>
      </p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Recommendations.propTypes = {
  show: PropTypes.bool,
};

export default Recommendations;
