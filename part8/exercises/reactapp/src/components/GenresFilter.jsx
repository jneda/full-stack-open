import PropTypes from "prop-types";

const GenresFilter = ({ books, setGenresFilter }) => {
  const genres = books.reduce((genres, book) => {
    book.genres.forEach((genre) => {
      if (!genres.includes(genre)) {
        genres.push(genre);
      }
    });
    return genres;
  }, []);

  const capitalize = (string) => {
    return string
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      {genres.map((genre) => (
        <button key={genre} onClick={() => setGenresFilter(genre)}>
          {capitalize(genre)}
        </button>
      ))}
      <button key="all genres" onClick={() => setGenresFilter(null)}>
        All Genres
      </button>
    </div>
  );
};

GenresFilter.propTypes = {
  books: PropTypes.array,
  setGenresFilter: PropTypes.func,
};

export default GenresFilter;
