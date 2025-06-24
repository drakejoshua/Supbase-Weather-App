import { FaCircleQuestion, FaCircleXmark, FaClipboardQuestion, FaCloudSunRain, FaListCheck, FaLocationDot, FaLocationPin, FaMagnifyingGlass, FaMoon, FaRegSun, FaRotateRight, FaTriangleExclamation, FaX, FaXmark } from 'react-icons/fa6'
import { Avatar, DropdownMenu, Collapsible } from 'radix-ui'
import '../styles/Dashboard.css'
import { useThemeProvider } from '../providers/ThemeProvider'
import Spinner from '../components/Spinner'
import SummaryData from '../components/SummaryData'
import SubLoader from '../components/SubLoader'
import SubError from '../components/SubError'
import SubPermNotGrant from '../components/SubPermNotGrant'
import ForecastData from '../components/ForecastData'
import RouteLoader from '../components/RouteLoader'
import RouteError from '../components/RouteError'


function Dashboard() {

  // theme state/context
  const { theme, toggleTheme } = useThemeProvider()

  return (
    // dashboard route container
    <div className="route">
      {/* <RouteLoader text="loading dashboard.."/> */}

      {/* <RouteError text="error loading dashboard"/> */}

      <div className="dashboard">
        {/* dashboard navbar */}
        <nav className="dashboard--navbar">
          {/* navbar logo */}
          <span className="dashboard--navbar__logo">
            <FaCloudSunRain className='dashboard--navbar__logo-icon'/>

            InstaWeather
          </span>

          {/* navbar buttons & links */}
          <div className="dashboard--navbar__buttons">
            {/* theme toggle button */}
            <button className="dashboard--navbar__theme-toggle-btn" onClick={ toggleTheme }>
              <FaRegSun className='dashboard--navbar__theme-toggle-icon'/>
              {/* <FaMoon className='dashboard--navbar__theme-toggle-icon'/> */}
            </button>

            {/* navbar avatar & dropdown */}
            <DropdownMenu.Root className="dashboard--navbar__dropdown">
              <DropdownMenu.Trigger className="dashboard--navbar__dropdown-trigger">

                {/* navbar avatar */}
                <Avatar.Root className="dashboard--navbar__avatar">
                  <Avatar.Image 
                    src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                    className="dashboard--navbar__avatar-image"
                  />

                  {/* <Spinner className="dashboard--navbar__avatar-loader-icon"/> */}

                  {/* <FaTriangleExclamation className="dashboard--navbar__avatar-error-icon"/> */}

                  {/* <Avatar.Fallback delayMs={1500} className="dashboard--navbar__avatar-fallback">
                    JB
                  </Avatar.Fallback> */}
                </Avatar.Root>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>

                {/* navbar dropdown content */}
                <DropdownMenu.Content className="dashboard--navbar__dropdown-content" sideOffset={8} align='end' side='bottom'>
                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item">
                    your preferences
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item">
                    update email
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item">
                    update password
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="dashboard--navbar__dropdown-separator"/>

                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item dashboard--navbar__dropdown-item--danger">
                    sign out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </nav>

        {/* dashboard searchbar */}
        <div className="dashboard--searchbar">
          <Collapsible.Root>
            <Collapsible.Trigger asChild>
              <div className="dashboard--searchbar__search">
                <FaMagnifyingGlass className='dashboard--searchbar__search-icon'/>

                <input type="text" id="" className="dashboard--searchbar__search-input" />

                {/* <FaXmark className='dashboard--searchbar__search-icon'/> */}
              </div>
            </Collapsible.Trigger>

            <div className="dashboard--searchbar__search-dropdown-ctn">
              <Collapsible.Content className='dashboard--searchbar__search-dropdown'>
                {/* loading */}
                {/* <div className="dashboard--searchbar__search-dropdown-loader">
                  <Spinner className='dashboard--searchbar__search-dropdown-load-icon'/>

                  loading locations
                </div> */}
                
                {/* error */}
                {/* <div className="dashboard--searchbar__search-dropdown-error">
                  <FaTriangleExclamation className='dashboard--searchbar__search-dropdown-error-icon'/>

                  error loading locations
                </div> */}

                {/* not-found */}
                {/* <div className="dashboard--searchbar__search-dropdown-not-found">
                  <FaListCheck className='dashboard--searchbar__search-dropdown-not-found-icon'/>

                  no locations matching "la" was found
                </div> */}

                {/* found / search-results */}
                <ul className="dashboard--searchbar__search-dropdown-result-list">
                  <li className="dashboard--searchbar__search-dropdown-result">
                      <FaLocationDot className='dashboard--searchbar__search-result-icon'/>

                      <div className="dashboard--searchbar__search-result-group">
                        <span className="dashboard--searchbar__search-result-city">
                          nairobi
                        </span>
                        
                        <span className="dashboard--searchbar__search-result-info">
                          nairobi, kenya
                        </span>
                      </div>
                  </li>

                  <li className="dashboard--searchbar__search-dropdown-result">
                    <FaLocationDot className='dashboard--searchbar__search-result-icon'/>

                    <div className="dashboard--searchbar__search-result-group">
                      <span className="dashboard--searchbar__search-result-city">
                        nairobi
                      </span>
                      
                      <span className="dashboard--searchbar__search-result-info">
                        nairobi, kenya
                      </span>
                    </div>
                  </li>
                  
                  <li className="dashboard--searchbar__search-dropdown-result">
                    <FaLocationDot className='dashboard--searchbar__search-result-icon'/>

                    <div className="dashboard--searchbar__search-result-group">
                      <span className="dashboard--searchbar__search-result-city">
                        nairobi
                      </span>
                      
                      <span className="dashboard--searchbar__search-result-info">
                        nairobi, kenya
                      </span>
                    </div>
                  </li>
                </ul>
              </Collapsible.Content>
            </div>
          </Collapsible.Root>
        </div>

        {/* dashboard location summary */}
        <div className="dashboard--summary">

          {/* summary data */}
          <SummaryData
            location="lagos"
            temperature="27*C"
            description='partly cloudy'
          />

          {/* loading */}
          {/* <SubLoader text='loading weather data for your location'/> */}
          
          {/* error */}
          {/* <SubError text='error loading location data'/> */}

          {/* permission not-granted */}
          {/* <SubPermNotGrant text="you have not granted location access"/> */}
        </div>

        {/* dashboard sub-heading */}
        <h2 className='dashboard--subheading'>
          weather forcast
        </h2>

        {/* dashboard weather forecast */}
        <div className="dashboard--forecast">
          {/* forecast data */}
          <ForecastData/>

          {/* loading */}
          {/* <SubLoader text='loading weather data for your location'/> */}

          {/* error */}
          {/* <SubError text='error loading location data'/> */}

          {/* permission not-granted */}
          {/* <SubPermNotGrant text="you have not granted location access"/> */}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
