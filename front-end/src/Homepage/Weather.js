import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { rapidKey } from "./key";

const Weather = () => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    fetch(
      "https://weatherbit-v1-mashape.p.rapidapi.com/current?lon=-73.5673&lat=45.5017",
      {
        method: "GET",
        headers: {
          "x-rapidapi-key": rapidKey,
          "x-rapidapi-host": "weatherbit-v1-mashape.p.rapidapi.com",
        },
      }
    )
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data[0]);
        setWeather(response.data[0]);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  if (weather) {
    return (
      <Content>
        <TempBox>
          <CurrentTemp>
            <TempNum>{parseInt(weather.temp)}</TempNum>
            <Exponent>°c</Exponent>
          </CurrentTemp>
          <FeelsLike>FEELS LIKE:</FeelsLike>
          <AppTemp>{parseInt(weather.app_temp)}°c</AppTemp>
        </TempBox>
        {weather ? (
          <img
            src={`https://www.weatherbit.io/static/img/icons/${weather.weather.icon}.png`}
            alt="weather icon"
          />
        ) : null}

        <InfoBox>
          <Description>{weather.weather.description}</Description>
          <Info>
            <div>Humidity: {weather.rh}%</div>
            <div>Precipitation: {weather.precip} mm/h</div>
            <div>Snow: {weather.snow} mm/h</div>
          </Info>
        </InfoBox>
      </Content>
    );
  } else {
    return <div>Loading weather.</div>;
  }
};
const Content = styled.div`
  display: flex;
  flex-direction: row;
  background-color: white;
  border-radius: 10px;
  margin: 10px;
  align-items: center;
  justify-content: center;
`;

const TempBox = styled.div`
  text-align: center;
`;
const CurrentTemp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const TempNum = styled.div`
  font-size: 3.4rem;
  font-weight: 300;
  line-height: 2.7rem;
  padding-top: 5px;
`;
const Exponent = styled.div`
  font-size: 1.5rem;
`;
const FeelsLike = styled.div`
  font-size: 0.7rem;
  padding-top: 10px;
`;
const AppTemp = styled.div`
  font-size: 1rem;
`;
const InfoBox = styled.div`
  padding-left: 8px;
`;
const Description = styled.div`
  font-weight: 300;
  font-size: 1.2rem;
`;
const Info = styled.div`
  padding-top: 0.5rem;
  font-size: 0.8rem;
`;
export default Weather;
