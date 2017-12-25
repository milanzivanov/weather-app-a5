import { Injectable } from '@angular/core';
import { RootObject } from './weather-template';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherService {

    constructor(private _http: HttpClient) { }

    getWeather(cityName: string) {

      return this._http.get(`https://api.openweathermap.org/data/2.5/forecast?id=524901&APPID=cf4acfccaeb719f8f2992c4f80d2031b&q=${cityName}&units=metric`)
      .map((result) => {

          return result as RootObject;

      });
    }
}
