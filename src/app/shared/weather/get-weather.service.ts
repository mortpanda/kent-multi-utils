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


  // strWeatherBaseURL;
  // arrWeatherInfo;

  // strWeatherLocation;
  // strIconString;
  // strTemperature;
  // strHightTemp;
  // strLowTemp;
  // strWeatherString;

  constructor() { }

  //async GetWeather(lat, lon) {
  // this.strWeatherBaseURL = this.strCurrentAPI + '?appid=' + this.strWeathAPI + '&lang=' + this.strlang + '&lat=' + lat + '&lon=' + lon + '&units=metric'
  // this.arrWeatherInfo = await this.HttpClient.get(this.strWeatherBaseURL)
  //   .toPromise()
  //   .then(data => {

  //     //console.log(data)
  //     //...
  //     return data;

  //   }).catch(function (err) {
  //     console.log('Error!');
  //   });
  // // console.log(this.arrWeatherInfo);
  // this.strWeatherLocation = this.arrWeatherInfo.name
  // this.strIconString = this.arrWeatherInfo.weather[0].icon
  // this.strTemperature = this.arrWeatherInfo.main.temp
  // this.strHightTemp = this.arrWeatherInfo.main.temp_max
  // this.strLowTemp = this.arrWeatherInfo.main.temp_min
  // this.strWeatherString = this.arrWeatherInfo.weather[0].description;
  //}

  arrMyWeather;
  async GetWeather(lat, lon) {
    this.arrMyWeather = await this.fetchWeather(this.strCurrentAPI + '?appid=' + this.strWeathAPI + '&lang=' + this.strlang + '&lat=' + lat + '&lon=' + lon + '&units=metric')
  }


  arrWeather;
  async fetchWeather(url) {
    const thisFetch = fetch(url, {
      method: 'POST',

    })
      .then(response => response.json())
     this.arrWeather = await thisFetch;
   console.log(this.arrWeather)
  }



}
