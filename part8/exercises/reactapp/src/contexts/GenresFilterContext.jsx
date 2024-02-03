import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const GenresFilterContext = createContext(null);

export const GenresFilterProvider = ({ children }) => {
  const [genresFilter, setGenresFilter] = useState(null);

  return (
    <GenresFilterContext.Provider value={{ genresFilter, setGenresFilter }}>
      {children}
    </GenresFilterContext.Provider>
  );
};

GenresFilterProvider.propTypes = {
  children: PropTypes.node,
};
