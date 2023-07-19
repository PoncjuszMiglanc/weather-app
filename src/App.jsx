import { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./app.css";

const App = () => {
  const [cityName, setCityName] = useState("Poznań");
  const [data, setData] = useState({});
  const myInput = useRef(null);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=2e0f6b976f18ac55b1efc32ce3d3c411&units=metric&lang=pl`;

  const getData = () => {
    axios
      .get(url)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) =>
        alert("Podałeś złą nazwę miasta", error.response.status)
      );
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getData();
    setCityName("");
  };

  useEffect(() => {
    myInput.current.focus();
    getData();
  }, []);

  return (
    <>
      <div className="weather">
        <div className="weather__main">
          <form className="weather__form" onSubmit={submitHandler}>
            <input
              className="weather__input"
              type="text"
              placeholder="podaj miasto"
              value={cityName}
              ref={myInput}
              onChange={(e) => setCityName(e.target.value)}
            />
          </form>
          <p className="weather__city">{data.name}</p>
          {data.main ? (
            <h1 className="weather__temp">{`${data.main.temp.toFixed()}°C`}</h1>
          ) : null}
          {data.weather ? (
            <p className="weather__conditions">{data.weather[0].description}</p>
          ) : null}
        </div>
        {data.weather ? (
          <img
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
            width={150}
            height={150}
            alt="icon"
          />
        ) : null}

        <div className="bottom">
          <div className="bottom__humidity-box">
            <p className="bottom__humidity-title">Wilgotność powietrza</p>
            {data.main ? (
              <p className="bottom__humidity-value">{`${data.main.humidity} %`}</p>
            ) : null}
          </div>
          <div className="bottom__pressure-box">
            <p className="bottom__pressure-title">Ciśnienie atmosferyczne</p>
            {data.main ? (
              <p className="bottom__pressure-value">{`${data.main.pressure} hPa`}</p>
            ) : null}
          </div>
          <div className="bottom__wind-box">
            <p className="bottom__wind-title">Prędkość wiatru</p>
            {data.wind ? (
              <p className="bottom__wind-value">{`${data.wind.speed} m/s`}</p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
