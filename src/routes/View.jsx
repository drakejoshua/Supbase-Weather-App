import '../styles/View.css'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'
import SummaryData from '../components/SummaryData'
import SubLoader from '../components/SubLoader'
import SubError from '../components/SubError'
import ForecastData from '../components/ForecastData'
import Topbar from '../components/Topbar'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import RouteError from '../components/RouteError'
import RouteLoader from '../components/RouteLoader'
import { useFavouriteProvider } from '../providers/FavouriteProvider'
import { useToastProvider } from '../providers/ToastProvider'
import { useDialogProvider } from '../providers/DialogProvider'


function View() {
  // route-level state
  const [ isRouteLoading, setIsRouteLoading ] = useState( true )
  const [ routeError, setRouteError ] = useState(null)

  const { favourites, addFavourite, removeFavourite, getFavourites } = useFavouriteProvider()

  const { showToast } = useToastProvider()
  const { showDialog } = useDialogProvider()

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
      const name = searchParams.get('name')

      if ( name ) {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${ name }&appid=${ weatherAPIKey }&units=metric`, {
          cache: 'no-store'
        })
        const forecastResp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${ name }&appid=${ weatherAPIKey }&units=metric`, {
          cache: 'no-store'
        })
        
        if ( resp.ok && forecastResp.ok ) {
          const json = await resp.json()
          const forecastRespJson = await forecastResp.json()

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

  async function fetchSearchData() {
    try {
      setIsRouteLoading( true )

      const name = searchParams.get('name')

      const { success, error } = await getFavourites()

      if ( success ) {
        if ( name ) {
          getCurrentWeather()
        } else {
          setRouteError( new Error('invalid search data'))
        }
      } else {
        setRouteError( error )
      }

    } catch( err ) {
      setRouteError( err )
    } finally {
      setIsRouteLoading( false )
    }
  }

  function checkIfLocationIsFavourite( lat, lon ) {
    return favourites.find( function( favourite ) {
      return favourite.latitude == lat && favourite.longitude == lon
    })
  }

  async function toggleFavourite() {
    try {
      const favouriteData = checkIfLocationIsFavourite( weatherData.coord.lat, weatherData.coord.lon );

      if ( favouriteData ) {
        const { success, error } = await removeFavourite( favouriteData.favourite_id )

        if ( success ) {
          showToast({
            title: 'Removed from Favourites'
          })
        } else {
          showDialog({
            title: "Error removing from Favourites",
            content: <div className="view--dialog__text">
                There was a problem removing this location from your favourites. Please try again. <br />
                Error: { error.message }
            </div>
          })
        }
      } else {
        const { success, error } = await addFavourite({
          name: weatherData.name,
          country: weatherData.sys.country,
          latitude: weatherData.coord.lat,
          longitude: weatherData.coord.lon,
        })

        if ( success ) {
          showToast({
            title: 'Added to Favourites'
          })
        } else {
          showDialog({
            title: "Error adding to Favourites",
            content: <div className="view--dialog__text">
                There was a problem removing this location from your favourites. Please try again. <br />
                Error: { error.message }
            </div>
          })
        }
      }
    } catch( err ) {
      showDialog({
        title: "Action Failed",
        content: <div className="view--dialog__text">
        Sorry, something went wrong while performing this action. Please try again.<br />
        Error: { err.message }
        </div>
      })
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

          <button className="view--location-bar__favourite-toggle" onClick={ toggleFavourite }>
            { checkIfLocationIsFavourite( weatherData?.coord.lat, weatherData?.coord.lon ) != null &&
               <FaHeart className='view--location-bar__favourite-toggle-icon'/>}
            { checkIfLocationIsFavourite( weatherData?.coord.lat, weatherData?.coord.lon ) == null &&
               <FaRegHeart className='view--location-bar__favourite-toggle-icon'/>}
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
