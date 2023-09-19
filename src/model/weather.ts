
export interface  CityData {
    lon: string,
    lat:string,
}

export interface WeatherInfo {
    coord: {
      lon: number;
      lat: number;
    };
    weather: Weather[];
    base: string;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      humidity: number;
    };
    visibility: number;
    wind: {
      speed: number;
      deg: number;
    };
    clouds: {
      all: number;
    };
    dt: number;
    sys: {
    country: string;
      sunrise: any;
      sunset: any;
    };
    timezone: number;
    name: string; 
  }
      
  interface Weather {
    description: string;
  }
      
