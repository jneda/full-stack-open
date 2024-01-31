import PropTypes from "prop-types";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";
import GenresFilter from "./GenresFilter";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS);
  const [genresFilter, setGenresFilter] = useState(null);

  if (!props.show) {
    return null;
  }

  if (result.loading) return <div>Loading...</div>;

  const filteredBooks = genresFilter
    ? result.data.allBooks.filter((book) => book.genres.includes(genresFilter))
    : result.data.allBooks;

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
          {filteredBooks.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <GenresFilter
        books={result.data.allBooks}
        setGenresFilter={setGenresFilter}
      />
    </div>
  );
};

Books.propTypes = {
  show: PropTypes.bool,
};

export default Books;
