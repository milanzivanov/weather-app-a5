import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { RootObject } from './weather-template';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

    constructor(private _weather: WeatherService) {}

    showHide = false;
    disableInput = false;

    cityNameTemp: number;
    main: RootObject;
    cityName: string;
    cityNameHumi: number;
    cityWeatherImg: string;

    result: { cityName: string,
              temp: number,
              humid: number,
              icon: string,
              date: string,
              wind: number}[] = [];
    addedCities: string[] = [];

    ngOnInit(): void {
      console.log(this.result);
    }

    getWeather() {

      const addedCities = this.cityName.split(',').map(city => city.trim());

      addedCities.forEach(city => {
        this._weather
          .getWeather(city)
          .subscribe(res => {
              const weatherCity = res;

              this.result.push({
                  cityName: res.city.name,
                  temp: res.list[0].main.temp,
                  humid: res.list[0].main.humidity,
                  icon: res.list[0].weather[0].icon,
                  wind: res.list[0].wind.speed,
                  date: res.list[0].dt_txt
              });

              console.log(this.result);

              this.disableInput = this.result.length > 2;
              this.cityName = '';

              console.log(res);
          });
      });
    }

    removeItem(i) {
        this.result.splice(i, 1);
        this.disableInput = this.result.length > 2;
    }

    eventHandler(event) {
        if (event.keyCode === 13) {
            this.getWeather();
        }
    }
}
