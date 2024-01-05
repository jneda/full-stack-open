import { useEffect, useState } from "react";
import countryService from "./services/country";
import weatherService from "./services/weather";
import Filter from "./components/Filter";
import Countries from "./components/Countries";
import CountryDetails from "./components/CountryDetails";

const App = () => {
  const [query, setQuery] = useState("");
  const [countries, setCountries] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!countries) {
      countryService.getAll().then((countries) => setCountries(countries));
    }
  }, []);

  useEffect(() => {
    if (!selectedCountry) return;

    const country = countries.find((c) => c.cca3 === selectedCountry);
    const [lat, lon] = country.capitalInfo.latlng
      ? country.capitalInfo.latlng
      : country.latlng;

    weatherService.getWeather(lat, lon).then((weather) => setWeather(weather));
  }, [selectedCountry]);

  const handleQueryChange = (event) => {
    setSelectedCountry(null);
    setQuery(event.target.value);
  };

  const handleShowCountry = (countryCca3) => {
    setSelectedCountry(countryCca3);
  };

  const filteredCountries =
    countries && query !== ""
      ? countries.filter((c) =>
          c.name.common.toLowerCase().includes(query.toLowerCase())
        )
      : null;

  if (filteredCountries && filteredCountries.length === 1 && !selectedCountry) {
    setSelectedCountry(filteredCountries[0].cca3);
  }

  return (
    <>
      <Filter query={query} handleQueryChange={handleQueryChange} />
      {selectedCountry ? (
        <CountryDetails
          country={countries.find((c) => c.cca3 === selectedCountry)}
          weather={weather}
        />
      ) : (
        <Countries
          countries={filteredCountries}
          showCountry={handleShowCountry}
        />
      )}
    </>
  );
};

export default App;
