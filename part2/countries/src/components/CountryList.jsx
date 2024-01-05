const CountryList = ({ countries, showCountry }) => {
  return (
    <div>
      {countries.map((c) => {
        return (
          <div key={c.cca3} className="country-list-item">
            <p>{c.name.common}</p>
            <button onClick={() => showCountry(c.cca3)}>Show</button>
          </div>
        );
      })}
    </div>
  );
};

export default CountryList;
