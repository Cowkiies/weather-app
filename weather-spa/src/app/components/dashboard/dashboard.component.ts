import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { City } from 'src/app/shared/models/city.model';
import { Weather } from 'src/app/shared/models/forecast.model';
import { UserService } from 'src/app/shared/service/user.service';
import { WeatherService } from 'src/app/shared/service/weather.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public weatherData: any;
  public currentWeather: Weather | undefined;
  public oneHourWeather: Weather | undefined;
  public twoDaysWeather: Weather | undefined;
  public sevenDaysWeather: Weather | undefined;
  public cityList: City[];
  public filteredCities: City[];
  public selectedCity: any;

  private subscriptions: Subscription;
  constructor (
    private weatherService: WeatherService,
    private userService: UserService
  ) {
    this.subscriptions = new Subscription();
    this.cityList = [];
    this.filteredCities = [];
    this.selectedCity = { } as City;
  }

  ngOnInit (): void {
    this.getWeatherData();
    this.subscriptions.add(
      this.weatherService.getCityList().subscribe((list: City[]) => {
        this.cityList = list;
        console.log(list);
      })
    );
  }

  ngOnDestroy (): void {
    this.subscriptions.unsubscribe();
  }

  search (event: any) {
    const filtered: City[] = [];
    const query = event.query;

    for (let i = 0; i < this.cityList.length; i++) {
      const city = this.cityList[i];
      if (city.fullName.toLowerCase().indexOf(query.toLowerCase()) === 0 &&
        !filtered.some(e => e.fullName.toLowerCase() === city.fullName.toLowerCase())
      ) {
        filtered.push(city);
      }
    }

    this.filteredCities = filtered.sort((a: City, b: City) => (a.fullName > b.fullName) ? 1 : -1);
  }

  onSelect (selectedCity: City) {
    this.getWeatherData(selectedCity.coord.lat, selectedCity.coord.lon);
  }

  getWeatherData (lat: number = 51.5, lon: number = -0.12) {
    this.subscriptions.add(
      this.weatherService.getWeatherData(lat, lon).subscribe(data => {
        this.weatherData = data;
        this.currentWeather = data.current;
        this.oneHourWeather = data.hourly[0];
        this.twoDaysWeather = data.daily[0];
        this.sevenDaysWeather = data.daily[1];
        console.log(data);
      })
    );
  }

  public logout (): void {
    this.userService.logout();
  }
}
