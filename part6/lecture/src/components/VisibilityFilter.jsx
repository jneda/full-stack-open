import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
  const dispatch = useDispatch();

  return (
    <div id="filter-selector">
      All{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("ALL"))}
      />
      Important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("IMPORTANT"))}
      />
      Non important{" "}
      <input
        type="radio"
        name="filter"
        onChange={() => dispatch(filterChange("NON_IMPORTANT"))}
      />
    </div>
  );
};

export default VisibilityFilter;
