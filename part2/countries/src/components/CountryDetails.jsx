import Weather from "./Weather";

const CountryDetails = ({ country, weather }) => {
  const name = country.name.common;
  const capital = country.capital[0];
  const area = country.area;
  const languages = Object.values(country.languages);
  const flag = country.flags;

  return (
    <>
      <h2>{name}</h2>
      <p>Capital: {capital}</p>
      <p>Area: {area} km2</p>
      <h3>Languages:</h3>
      <ul>
        {languages.map((l) => (
          <li key={l}>{l}</li>
        ))}
      </ul>
      <img src={flag.png} alt={flag.alt} />
      {weather ? <Weather weather={weather} capital={capital} /> : null}
    </>
  );
};

export default CountryDetails;
