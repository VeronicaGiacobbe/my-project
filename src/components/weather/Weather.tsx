import { useState, useEffect, FC } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { CityData, WeatherInfo } from '../../model/weather';
import CardWeather from './CardWeather';

const skyImage = require('../../assets/img/sky.jpg');

const Weather: FC = (): JSX.Element => {
  const [search, setSearch] = useState<string>('');
  const [infoCity, setInfoCity] = useState<CityData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherInfo | null>(null);

  const getCardinalsInfo = async () => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
      );
      const value = response?.data?.map(
        (item: { lat: string; lon: string }) => {
          return { lat: item.lat, lon: item.lon };
        }
      )[0];
      setInfoCity(value);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (infoCity) {
      fetchWeatherApi();
    }
  }, [infoCity]);

  const fetchWeatherApi = async () => {
    try {
      const res = await axios.get(
        ` https://api.openweathermap.org/data/2.5/weather?lat=${infoCity?.lat}&lon=${infoCity?.lon}&appid=88a4397c81da372aeaba2f6b0a7302b2&units=metric`
      );

      setWeatherData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e: { key: string }) => {
    if (e.key === 'Enter') {
      getCardinalsInfo();
    }
  };

  return (
    <Container>
      <SearchContainer>
        <SearchInput
          type="text"
          placeholder="Enter Location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <FindButton
          onClick={() => getCardinalsInfo()}
          disabled={!search.length}
        >
          FIND
        </FindButton>
      </SearchContainer>
      {weatherData && <CardWeather item={weatherData} />}
    </Container>
  );
};

export default Weather;

const Container = styled.div`
  background-image: url(${skyImage});
  height: 95vh;
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 14rem;
  height: 2.1rem;
  border-radius: 5px;
  border: none;
  background-color: #eee3eec0;
  box-shadow: 5px 5px 15px rgb(0, 0, 0);
  margin-top: 1.8rem;
`;

const FindButton = styled.button`
  background-color: #343331cf;
  color: white;
  border: 2px solid #ede8dd;
  padding: 0.3rem;
  border-radius: 5px;
  width: 7.5rem;
  height: 2.3rem;
  margin-top: 1.8rem;
  font-weight: bold;
`;

const SearchContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 23.1rem;
`;
