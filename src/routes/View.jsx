import '../styles/View.css'
import { FaArrowLeft, FaHeart, FaMoon, FaRegHeart, FaRegSun } from 'react-icons/fa6'
import SummaryData from '../components/SummaryData'
import SubLoader from '../components/SubLoader'
import SubError from '../components/SubError'
import ForecastData from '../components/ForecastData'
import Topbar from '../components/Topbar'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RouteError from '../components/RouteError'
import RouteLoader from '../components/RouteLoader'


function View() {
  // route-level state
  const [ isRouteLoading, setIsRouteLoading ] = useState( true )
  const [ routeError, setRouteError ] = useState(null)

  const [ weatherData, setWeatherData ] = useState(null)
  const [ weatherForecastData, setWeatherForecastData ] = useState(null)
  const [ weatherError, setWeatherError ] = useState( null )
  const [ isWeatherDataLoading, setIsWeatherDataLoading ] = useState( false )

  const navigateTo = useNavigate()

  const [ searchParams, setSearchParams ] = useSearchParams()

  async function getCurrentWeather() {
    try {
      setIsWeatherDataLoading( true )
      setWeatherError( null )
      setWeatherData( null )
      
      const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY
      const lat = searchParams.get('lat')
      const lon = searchParams.get('lon')
      console.log("lat: ", lat, "lon: ", lon ) 

      if ( lat && lon ) {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ lon }&appid=${ weatherAPIKey }&units=metric`, {
          cache: 'no-store'
        })
        const forecastResp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${ lat }&lon=${ lon }&appid=${ weatherAPIKey }&units=metric`, {
          cache: 'no-store'
        })
        
        if ( resp.ok && forecastResp.ok ) {
          const json = await resp.json()
          const forecastRespJson = await forecastResp.json()

          console.log('weather data: ', json)
          console.log('weather firecast data: ', forecastRespJson)

          setWeatherData( json )
          setWeatherForecastData( forecastRespJson )
        } else {
          setWeatherError( resp.statusText || forecastResp.statusText )
        }
      }
    } catch( err ) {
      setWeatherError( err )
    } finally {
      setIsWeatherDataLoading( false )
    }
  }

  function fetchSearchData() {
    try {
      setIsRouteLoading( true )

      const lat = searchParams.get('lat')
      const lon = searchParams.get('lon')

      if ( lat && lon ) {
        getCurrentWeather()
      } else {
        setRouteError( new Error('invalid search data'))
      }
    } catch( err ) {
      setRouteError( err )
    } finally {
      setIsRouteLoading( false )
    }
  }

  useEffect( function() {
    fetchSearchData()
  }, [])

  return (
    <div className="route">
      { isRouteLoading && <RouteLoader text="loading weather data for this location.."/>}

      { routeError && <RouteError 
        text={"error loading data: " + routeError.message } 
        handleRetry={ () => navigateTo('/')}
      />}

      { ( !isRouteLoading && !routeError ) && <div className="view">
        <Topbar/>

        <div className="view--location-bar">
          <span className="view--location-bar__location">
            { weatherData?.name || 'loading...' }
          </span>

          <button className="view--location-bar__favourite-toggle">
            <FaHeart className='view--location-bar__favourite-toggle-icon'/>
            {/* <FaRegHeart className='view--location-bar__favourite-toggle-icon'/> */}
          </button>
        </div>

        <div className="view--summary">
          { weatherData && <SummaryData 
            iconCode={weatherData.weather[0].icon} 
            location={weatherData.name} 
            temperature={ weatherData.main.temp } 
            description={ weatherData.weather[0].description }
          />}

          { isWeatherDataLoading && <SubLoader text="fetching data for this location"/>}
          { weatherError && <SubError text="error fetching data for the location" handleRetry={ () => getCurrentWeather()}/>}
        </div>

        <h2 className="view--subheading">
          weather forecast
        </h2>

        <div className="view--forecast">
          { weatherForecastData && <ForecastData data={ weatherForecastData?.list }/>}

          { isWeatherDataLoading && <SubLoader text={"loading weather data for this location..."}/>}

          { weatherError && <SubError text={`error loading location data: ${ weatherError.message }`} handleRetry={ () => getCurrentWeather()}/>}
        </div>
      </div>}
    </div>
  )
}

export default View
