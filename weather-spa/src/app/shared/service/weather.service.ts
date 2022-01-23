import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { City } from '../models/city.model';
import { Forecast } from '../models/forecast.model';

@Injectable({ providedIn: 'root' })

export class WeatherService {
  constructor (
      private httpClient: HttpClient
  ) {}

  public getWeatherData (lat: number, lon: number): Observable<Forecast> {
    return this.httpClient.get<Forecast>(`${environment.API_URL}/api/weather?lat=${lat}&lon=${lon}`)
      .pipe(
        map((data: Forecast) => {
          data.hourly[1].sunrise = data.current.sunrise;
          data.hourly[1].sunset = data.current.sunset;
          return {
            ...data,
            hourly: [data.hourly[1]],
            daily: [data.daily[2], data.daily[7]]
          };
        }),
        catchError(error => {
          console.error(error);
          return of({} as Forecast);
        })
      );
  }

  public getCityList (): Observable<City[]> {
    return this.httpClient.get<City[]>('assets/city.list.json')
      .pipe(
        map((cities: City[]) => {
          cities.map((city: City) => {
            const state = city.state !== '' ? ', '.concat(city.state) : '';
            city.fullName = city.name.concat(', ', city.country, state);
            return city;
          });
          return cities;
        }),
        catchError(error => {
          console.error(error);
          return of([{}] as City[]);
        })
      );
  }
}
