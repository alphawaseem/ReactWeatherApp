
export class WeatherAPI {
  apiKey ;
  currentCity;
//   findCityUrl = `http://api.wunderground.com/api/${this.apiKey}/geolookup/q/${lat},${lng}.json`;
  constructor(apiKey){
    this.apiKey = apiKey;
    this.autoIpUrl = `http://api.wunderground.com/api/${this.apiKey}/geolookup/q/autoip.json`;
    this.coords = {}
    this.defaultCoords = {lat:'13.001487',lng:'76.0959985'};
  }
  getCoordsPromise(){
    let coords = {};
    let geo_options = {
        enableHighAccuracy: true, 
        maximumAge        : 30000, 
        timeout           : 27000
      };
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
          console.log('locating');
            let lat = position.coords.latitude; 
            let lng = position.coords.longitude;
            coords.lat = lat;
            coords.lng = lng;            
        },error => {
            console.log(error);
            console.log('Finding location by ip address');
            return this.getCoordsByIpPromise().then(res=>res).catch(error => {
                console.log('failed to fetch by ip.....returning default values');
                return Promise.resolve(this.defaultCoords);
            }); 
        },geo_options);
       } else {
            return this.getCoordsByIpPromise().then(res=>res).catch(error => {
                console.log('failed to fetch by ip.....returning default values');
                return Promise.resolve(this.defaultCoords);
            }); 
      }
      return Promise.resolve(coords);
  }
  getCoordsByIpPromise(){
     return fetch(this.autoIpUrl).then(res => res.json()).then(result => {
         let coords = {};
        coords.lat = result.location.lat;
        coords.lng = result.location.lon;
        return coords;
    });
  }
  getForecast(){
    let hourlyForecastUrl = `http://api.wunderground.com/api/${this.apiKey}/hourly/q/${this.country}/${this.currentCity}.json`;
    return fetch(hourlyForecastUrl).then(response=>{
      return response.json();
    });
  }
}
