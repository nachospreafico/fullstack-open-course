import { useState, useEffect } from "react";

function App() {
  const [countries, setCountries] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [weatherData, setWeatherData] = useState(null);

  function fetchAllData() {
    return fetch("https://studies.cs.helsinki.fi/restcountries/api/all");
  }

  function filterCountries(countryName) {
    if (countryName.trim() === "") {
      return setFilteredList([]);
    }
    setFilteredList(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(countryName.toLowerCase())
      )
    );
  }

  function fetchWeather(capital) {
    const apiKey = import.meta.env.VITE_MY_API_KEY;

    return fetch(`https://api.api-ninjas.com/v1/weather?city=${capital}`, {
      headers: {
        "X-Api-Key": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => setWeatherData(data))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    fetchAllData()
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (filteredList.length === 1) {
      fetchWeather(filteredList[0].capital);
    }
  }, [filteredList]);

  return (
    <div>
      <div>
        Find countries{" "}
        <input
          onChange={(e) => filterCountries(e.target.value)}
          type="text"
          id="country-name"
        ></input>
      </div>
      <div>
        {filteredList.length === 0 ? (
          countries.map((elem, index) => {
            return <p key={index}>{elem.name.common}</p>;
          })
        ) : filteredList.length === 1 ? (
          <>
            <h2>{filteredList[0].name.common}</h2>
            <p>Capital: {filteredList[0].capital}</p>
            <p>
              Area: {filteredList[0].area} km<sup>2</sup>
            </p>
            <p style={{ fontWeight: "700" }}>Languages:</p>
            <ul>
              {Object.entries(filteredList[0].languages).map(
                ([code, language]) => (
                  <li key={code}>{language}</li>
                )
              )}
            </ul>
            <img
              src={filteredList[0].flags.png}
              alt={filteredList[0].flags.alt}
            ></img>
            <h2>Weather in {filteredList[0].capital}</h2>
            {weatherData && (
              <>
                <p>Temperature: {weatherData.temp} °C</p>
                <p>Wind Speed: {weatherData.wind_speed} m/s</p>
              </>
            )}
          </>
        ) : filteredList.length > 1 && filteredList.length <= 10 ? (
          filteredList.map((elem, index) => {
            return (
              <div
                key={index}
                style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
              >
                <p>{elem.name.common}</p>
                <button onClick={() => setFilteredList([elem])}>Show</button>
              </div>
            );
          })
        ) : (
          <p>Too many matches, please specifiy another filter</p>
        )}
      </div>
    </div>
  );
}

export default App;
