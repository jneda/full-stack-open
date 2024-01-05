import CountryList from "./CountryList";

const Countries = ({ countries, showCountry }) => {
  if (!countries) return null;

  if (countries.length === 0) {
    return <div>No match for this query, specify another filter.</div>;
  }

  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  }

  return <CountryList countries={countries} showCountry={showCountry} />;
};

export default Countries;
