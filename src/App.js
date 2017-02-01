import React, { Component } from 'react';
import logo from './img/sun_and_clouds.png';
import './App.css';
const weatherApiKey = '373a5cf6b3655712';

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

class App extends Component {
  constructor(props){
    super(props);
    let weather = new WeatherAPI(weatherApiKey,'Hassan','India');
    weather.getForecast().then(res => console.log(res));
  }
  render() {
    return (
      <div className="text-center">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Weather App</h2>
          <Location />
          <Temperatue celsius="20" color="orange"/>
       </div>
    );
  }
}

export class Temperatue extends Component{
  constructor(props){
    super(props);

    this.celsius = props.celsius;
    this.fahrenheit = props.fahrenheit;

    if(this.celsius){
      this.state = {inCelsius:true};
      this.fahrenheit = this.toFahrenheit(this.celsius);
    } else {
      this.state = {inCelsius:false};
      this.celsius = this.toCelsius(this.fahrenheit);
    }
    this.toggleTemp = this.toggleTemp.bind(this);
  }

  toggleTemp(){
    this.setState(prevState => ({
       inCelsius : !prevState.inCelsius
      }));
  }

  toFahrenheit(){
    return this.celsius * 9 / 5 + 32;
  }

  toCelsius(){
    return (this.fahrenheit - 32) * 5 / 9;
  }

  render(){
    let styles = {
      cursor : 'pointer',
      textDecoration : 'underline',
      color : this.props.color,
    }
    return (
      <h3 style={styles} onClick={this.toggleTemp} title="Click to change metrics">{ this.state.inCelsius ? `${this.celsius} °C` : `${this.fahrenheit}	°F`}</h3> 
    )
  }
}


export default App;
