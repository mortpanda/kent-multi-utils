import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetWeatherService {

  strWeathAPI = '3db778e229817cf109868d0833e123ec';
  strlang = 'ja';
  strCurrentAPI = 'https://api.openweathermap.org/data/2.5/weather';
  strIconURL = 'https://openweathermap.org/img/wn/'
  strIconSizeMultipler = '@2x.png'
  // e.g. https://openweathermap.org/img/wn/04n@2x.png


  constructor() { }


  arrMyWeather;
  async GetWeather(lat, lon) {
    this.arrMyWeather = await this.fetchWeather(this.strCurrentAPI + '?appid=' + this.strWeathAPI + '&lang=' + this.strlang + '&lat=' + lat + '&lon=' + lon + '&units=metric')
  }


  arrWeather;
  myWeatherIcon;
  async fetchWeather(url) {
    const thisFetch = fetch(url, {
      method: 'POST',

    })
      .then(response => response.json())
    this.arrWeather = await thisFetch;
    console.log(this.arrWeather);

    this.myWeatherIcon = await this.strIconURL + this.arrWeather.weather[0].icon + this.strIconSizeMultipler;
    console.log(this.myWeatherIcon);
  }



}
