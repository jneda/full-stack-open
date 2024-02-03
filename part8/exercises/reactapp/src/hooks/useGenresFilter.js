import { useContext } from "react";
import { GenresFilterContext } from "../contexts/GenresFilterContext";

export const useGenresFilter = () => {
  return useContext(GenresFilterContext);
};
