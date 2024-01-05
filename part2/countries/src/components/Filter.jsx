const Filter = ({ query, handleQueryChange }) => {
  return (
    <div className="filter">
      Find countries: <input value={query} onChange={handleQueryChange} />
    </div>
  );
};

export default Filter;
