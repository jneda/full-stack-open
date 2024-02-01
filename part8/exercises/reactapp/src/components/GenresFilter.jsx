import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { All_GENRES } from "../queries";

const GenresFilter = ({ booksQuery }) => {
  const genresQuery = useQuery(All_GENRES);

  if (genresQuery.loading) return null;

  const genres = genresQuery.data.allGenres;

  const capitalize = (string) => {
    return string
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <div>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            booksQuery.refetch({ genre });
          }}
        >
          {capitalize(genre)}
        </button>
      ))}
      <button
        key="all genres"
        onClick={() => {
          booksQuery.refetch({ genre: null });
        }}
      >
        All Genres
      </button>
    </div>
  );
};

GenresFilter.propTypes = {
  booksQuery: PropTypes.object,
};

export default GenresFilter;
