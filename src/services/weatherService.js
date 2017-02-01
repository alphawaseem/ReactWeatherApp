
export class WeatherAPI {
  apiKey ;
  currentCity;
  constructor(apiKey,city,country){
    this.apiKey = apiKey;
    this.currentCity = city;
    this.country = country;
  }
  getForecast(){
    let hourlyForecastUrl = `http://api.wunderground.com/api/${this.apiKey}/hourly/q/${this.country}/${this.currentCity}.json`;
    return fetch(hourlyForecastUrl).then(response=>{
      return response.json();
    });
  }
}
