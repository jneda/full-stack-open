import PropTypes from "prop-types";
import { useQuery } from "@apollo/client";
import { ALL_GENRES } from "../queries";
import { useGenresFilter } from "../hooks/useGenresFilter";

const GenresFilter = ({ booksQuery }) => {
  const genresQuery = useQuery(ALL_GENRES);
  const { setGenresFilter } = useGenresFilter();

  if (genresQuery.loading) return null;

  const genres = genresQuery.data.allGenres;

  const capitalize = (string) => {
    return string
      .split(" ")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleGenreFilterChange = (genre) => {
    setGenresFilter(genre);
    booksQuery.refetch({ genre });
  };

  return (
    <div>
      {genres.map((genre) => (
        <button
          key={genre}
          onClick={() => {
            handleGenreFilterChange(genre);
          }}
        >
          {capitalize(genre)}
        </button>
      ))}
      <button
        key="all genres"
        onClick={() => {
          handleGenreFilterChange(null);
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
