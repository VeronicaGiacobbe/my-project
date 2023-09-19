import { WeatherInfo } from '../../model/weather';
import styled from 'styled-components';

const sunnyImage = require('../../assets/img/sun.png');
const cloudyImage = require('../../assets/img/cloudy.png');
const rainyImage = require('../../assets/img/rain.png');
const snowingImage = require('../../assets/img/snow.png');
const partlySunnyImage = require('../../assets/img/partly sunny.png');
interface Props {
  item: WeatherInfo | null;
}

const WeatherCard = ({ item }: Props) => {
  const temperature = item?.main?.temp ? Math.round(item.main.temp) : null;
  const maxTemperature = item?.main?.temp_max
    ? Math.round(item.main.temp_max)
    : null;
  const minTemperature = item?.main?.temp_min
    ? Math.round(item.main.temp_min)
    : null;
  const feelsLikeTemperature = item?.main?.feels_like
    ? Math.round(item.main.feels_like)
    : null;

  const getWeatherImage = () => {
    const lowerDescription = item?.weather[0]?.description.toLowerCase();

    switch (true) {
      case lowerDescription?.includes('sunny'):
        return sunnyImage;
      case lowerDescription?.includes('broken'):
        return cloudyImage;
      case lowerDescription?.includes('rain'):
        return rainyImage;
      case lowerDescription?.includes('snow'):
        return snowingImage;
      case lowerDescription?.includes('clear'):
        return sunnyImage;
      case lowerDescription?.includes('cloud'):
        return partlySunnyImage;
      case lowerDescription?.includes('sun'):
        return sunnyImage;
      case lowerDescription?.includes('haze'):
        return cloudyImage;
      case lowerDescription?.includes('mist'):
        return cloudyImage;
      default:
        return null;
    }
  };
  return (
    <ContainerInfoData>
      <CityName>
        <span>
          {item?.name} - {item?.sys?.country}
        </span>
      </CityName>
      <WeatherSection>
        <Temperature>{temperature}°C</Temperature>
        <WeatherImage src={getWeatherImage()} alt="Weather" />
        <WheatherDescription>
          {item?.weather[0]?.description?.toUpperCase()}
        </WheatherDescription>
      </WeatherSection>
      <SeparationBox>
        <OuterBoxWeatherInfo>
          <TemperatureInfo>
            <span>Max: {maxTemperature}°C</span>
            <span>Min: {minTemperature}°C</span>
            <span>Fell-like: {feelsLikeTemperature}°C</span>
          </TemperatureInfo>
          <OthersInfo>
            <span>Humidity: {item?.main?.humidity}%</span>
            <span>Atm pressure: {item?.main?.pressure} hPa</span>
            <span>Wind: {item?.wind?.speed} m/sc</span>
          </OthersInfo>
        </OuterBoxWeatherInfo>
      </SeparationBox>
    </ContainerInfoData>
  );
};

export default WeatherCard;

const ContainerInfoData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 31.2rem;
  height: 28rem;
  background-image: linear-gradient(to bottom, #a0c7e9ed, #033a78eb);
  margin-top: 1.8rem;
  border-radius: 10px;
`;

const CityName = styled.span`
  color: white;
  font-weight: bold;
  display: flex;
  justify-content: center;
  font-size: 1.8rem;
`;

const Temperature = styled.span`
  color: white;
  font-size: 1.5rem;
`;

const WheatherDescription = styled.p`
  color: white;
  font-size: 1.5rem;
  margin-top: 1.12rem;
`;

const TemperatureInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.12rem;
`;

const OthersInfo = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  font-size: 1.12rem;
`;

const OuterBoxWeatherInfo = styled.div`
  width: 28rem;
  height: 4.6rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem;
  border-radius: 5px;
  background-image: linear-gradient(to bottom, #c0cdd8ae, #0e83c7eb);
`;

const SeparationBox = styled.div`
  display: flex;
  justify-content: center;
`;

const WeatherImage = styled.img`
  width: 12.5rem;
  height: 10.6rem;
`;

const WeatherSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
`;
