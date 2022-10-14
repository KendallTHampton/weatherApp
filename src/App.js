import './App.css';
import React, {useState} from 'react';



const API_KEY = process.env.REACT_APP_API_KEY
const baseURL = "https://api.openweathermap.org/data/2.5/"


function App()
{

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [httpRequest, setHttpRequest] = useState(null)



  const search = evt =>
  {
    if (evt.key === "Enter" || evt.key === '13' || evt.key === '229')
    {
      const fetchWeather = async () =>
      {
        try
        {
          let response = await fetch(`${ baseURL }weather?q=${ query }&units=imperial&APPID=${ API_KEY }`)

          if (!response.ok)
          {
            throw new Error("Something Went Wrong")
          }

          const weatherData = await response.json()

          setWeather(weatherData)
          setQuery('')
          setHttpRequest(true)
        }


        catch (error)
        {
          console.log(error)
          setQuery('')
          setHttpRequest(false)

        }
      }

      fetchWeather()
    }
  }

  let showIcon

  if (httpRequest)
  {
    const icon = weather.weather[0].icon
    const weatherIcon = 'http://openweathermap.org/img/wn/' + icon + '@2x.png'
    showIcon = <img src={weatherIcon} alt="Weather Icon" />
  }


  return (
    <div className="App">
      <h1>Welcome To My Weather App</h1>
      <div className="search_box">
        <input
          type="text"
          className="search_bar"
          placeholder='search...'
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={search}
          onm
        />

      </div>



      {(typeof weather.main != "undefined") && (

        <div className="location_box">
          <div className="date">Current Weather In:</div>
          <div className="location">{weather.name}, {weather.sys.country}</div>
          <div className="underline"></div>
          <div className="weather_box">
            <div className="temp">
              {Math.round(weather.main.temp)} &#176; F
            </div>

            <div className="weather">
              {showIcon}
              <h3> {weather.weather[0].description}</h3>
            </div>

          </div>

        </div>

      )}
      {httpRequest === false && <div className="place"> Please type in a valid location</div>}



    </div>
  );
}

export default App;

  // const dateBuilder = (d) =>
  // {
  //   let months = ["January", " Feburaury", "March", "April", "May", "June", "July", "August", "September", "November", "December"]
  //   let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  //   let day = days[d.getDay()]
  //   let date = d.getDate()
  //   let month = months[d.getMonth()]
  //   let year = d.getFullYear()

  //   return `${day}` `${date}` `${month}` `${year}`

  // }