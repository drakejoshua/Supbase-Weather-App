import '../styles/View.css'
import { FaArrowLeft, FaHeart, FaMoon, FaRegHeart, FaRegSun } from 'react-icons/fa6'
import SummaryData from '../components/SummaryData'
import SubLoader from '../components/SubLoader'
import SubError from '../components/SubError'
import ForecastData from '../components/ForecastData'
import { useThemeProvider } from '../providers/ThemeProvider'
import Topbar from '../components/Topbar'


function View() {
  const { theme, toggleTheme } = useThemeProvider()

  return (
    <div className="route">
      {/* <RouteLoader text="loading weather data.."/> */}

      {/* <RouteError text="error loading data"/> */}

      <div className="view">
        <Topbar/>

        <div className="view--location-bar">
          <span className="view--location-bar__location">
            lagos
          </span>

          <button className="view--location-bar__favourite-toggle">
            <FaHeart className='view--location-bar__favourite-toggle-icon'/>
            {/* <FaRegHeart className='view--location-bar__favourite-toggle-icon'/> */}
          </button>
        </div>

        <div className="view--summary">
          <SummaryData iconCode={'04d'} location="lagos" temperature="27*C" description="partly cloudy"/>

          {/* <SubLoader text="fetching data for this location"/> */}
          {/* <SubError text="error fetching data for the location"/> */}
        </div>

        <h2 className="view--subheading">
          weather forecast
        </h2>

        <div className="view--forecast">
          {/* <ForecastData data={[]}/> */}

          <SubLoader/>

          {/* <SubError/> */}
        </div>
      </div>
    </div>
  )
}

export default View
