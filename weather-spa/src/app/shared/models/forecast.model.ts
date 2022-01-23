/* eslint-disable camelcase */
export interface WeatherData {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface DailyForecast {
    day: number;
    eve: number;
    morn: number;
    night: number;
    min?: number;
    max?: number;
}

export interface Weather {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number | DailyForecast;
    humidity: number;
    pop: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number | DailyForecast;
    uvi: number;
    visibility: number;
    weather: WeatherData[];
    wind_deg: number;
    wind_gust: number;
    wind_speed: number;
}

export interface Forecast {
    lat: number;
    lon: number;
    timezone: string;
    timezoneOffset: number;
    current: Weather;
    hourly: Weather[];
    daily: Weather[];
}
