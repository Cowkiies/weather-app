/* eslint-disable no-undef */
import { of } from 'rxjs';
import { City } from 'src/app/shared/models/city.model';
import { DashboardComponent } from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  const mockWeatherService = jasmine.createSpyObj('mockWeatherService', ['getWeatherData', 'getCityList']);
  const mockUserService = jasmine.createSpyObj('mockUserService', ['createUser', 'login', 'logout']);
  const mockcityList: City[] = [
    {
      id: 6454798,
      name: 'Montauban',
      fullName: 'Montauban, FR',
      state: '',
      country: 'FR',
      coord: {
        lon: 1.35,
        lat: 44.01667
      }
    },
    {
      id: 2562247,
      name: 'Marsaxlokk',
      fullName: 'Marsaxlokk, MT',
      state: '',
      country: 'MT',
      coord: {
        lon: 14.54306,
        lat: 35.841942
      }
    }
  ];
  const mockWeatherData = {
    lat: 44.0167,
    lon: 1.35,
    timezone: 'Europe/Paris',
    timezoneOffset: 0,
    current: {
      dt: 1642951032,
      sunrise: 1642922452,
      sunset: 1642956696,
      temp: 10.36,
      feels_like: 8.97,
      pressure: 1027,
      humidity: 58,
      dew_point: 2.46,
      uvi: 0.43,
      clouds: 0,
      visibility: 10000,
      wind_speed: 1.31,
      wind_deg: 66,
      wind_gust: 2.14,
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01d'
        }
      ],
      pop: 0
    },
    hourly: [
      {
        dt: 1642953600,
        sunrise: 0,
        sunset: 0,
        temp: 9.75,
        feels_like: 9.75,
        pressure: 1027,
        humidity: 60,
        dew_point: 2.37,
        uvi: 0.11,
        clouds: 0,
        visibility: 10000,
        wind_speed: 1.1,
        wind_deg: 32,
        wind_gust: 1.16,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        pop: 0
      }
    ],
    daily: [
      {
        dt: 1643198400,
        sunrise: 1643181499,
        sunset: 1643216139,
        temp: {
          day: 8.16,
          min: 2.06,
          max: 9.54,
          night: 4.31,
          eve: 5.66,
          morn: 2.06
        },
        feels_like: {
          day: 7.45,
          night: 4.31,
          eve: 4.89,
          morn: 2.06
        },
        pressure: 1033,
        humidity: 66,
        dew_point: 1.97,
        uvi: 1.42,
        clouds: 0,
        visibility: 0,
        wind_speed: 1.9,
        wind_deg: 322,
        wind_gust: 2.49,
        weather: [
          {
            id: 800,
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ],
        pop: 0
      },
      {
        dt: 1643544000,
        sunrise: 1643526866,
        sunset: 1643562069,
        temp: {
          day: 7.29,
          min: 0.84,
          max: 8.43,
          night: 6.62,
          eve: 6.77,
          morn: 0.84
        },
        feels_like: {
          day: 4.33,
          night: 3.5,
          eve: 4.1,
          morn: -2.43
        },
        pressure: 1037,
        humidity: 71,
        dew_point: 2.22,
        uvi: 2,
        clouds: 37,
        visibility: 0,
        wind_speed: 4.96,
        wind_deg: 305,
        wind_gust: 10.77,
        weather: [
          {
            id: 500,
            main: 'Rain',
            description: 'light rain',
            icon: '10d'
          }
        ],
        pop: 0.2
      }
    ]
  };
  // const mockLocalStorage = {
  //   getItem: (key: string): string => {
  //     return key in store ? store[key] : null;
  //   },
  //   setItem: (key: string, value: string) => {
  //     store[key] = `${value}`;
  //   }
  // };

  beforeEach(() => {
    mockWeatherService.getWeatherData.and.returnValue(of(mockWeatherData));
    component = new DashboardComponent(mockWeatherService, mockUserService);
    component.cityList = mockcityList;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should return a city when searching with fullName', () => {
    const event = { query: 'Montauban, FR' };
    component.search(event);
    expect(component.filteredCities[0].fullName).toEqual(event.query);
  });

  it('should get weatherData', () => {
    component.getWeatherData();
    expect(component.weatherData).toEqual(mockWeatherData);
    expect(component.currentWeather).toEqual(mockWeatherData.current);
    expect(component.oneHourWeather).toEqual(mockWeatherData.hourly[0]);
    expect(component.twoDaysWeather).toEqual(mockWeatherData.daily[0]);
    expect(component.sevenDaysWeather).toEqual(mockWeatherData.daily[1]);
  });
});
