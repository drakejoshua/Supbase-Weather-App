import { FaCircleQuestion, FaClipboardQuestion, FaCloudSunRain, FaListCheck, FaLocationDot, FaLocationPin, FaMagnifyingGlass, FaMoon, FaRegSun, FaRotateRight, FaSpinner, FaTriangleExclamation } from 'react-icons/fa6'
import { Avatar, DropdownMenu } from 'radix-ui'


function Dashboard() {
  return (
    // dashboard route container
    <div className="route dashboard">
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
          <button className="dashboard--navbar__theme-toggle-btn">
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

                <FaSpinner className="dashboard--navbar__avatar-loader-icon"/>

                <FaTriangleExclamation className="dashboard--navbar__avatar-error-icon"/>

                <Avatar.Fallback delayMs={1500} className="dashboard--navbar__avatar-fallback">
                  JB
                </Avatar.Fallback>
              </Avatar.Root>
            </DropdownMenu.Trigger>

            <DropdownMenu.Portal>

              {/* navbar dropdown content */}
              <DropdownMenu.Content className="dashboard--navbar__dropdown-content">
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
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <div className="dashboard--searchbar__search">
              <FaMagnifyingGlass className='dashboard--searchbar__search-icon'/>

              <input type="text" id="" className="dashboard--searchbar__search-input" />
            </div>
          </DropdownMenu.Trigger>

          <DropdownMenu.Portal>
            <DropdownMenu.Content className='dashboard--searchbar__search-dropdown'>
              {/* loading */}
              <div className="dashboard--searchbar__search-dropdown-loader">
                <FaSpinner className='dashboard--searchbar__search-dropdown-load-icon'/>

                loading locations
              </div>
              
              {/* error */}
              <div className="dashboard--searchbar__search-dropdown-error">
                <FaTriangleExclamation className='dashboard--searchbar__search-dropdown-error-icon'/>

                error loading locations
              </div>

              {/* not-found */}
              <div className="dashboard--searchbar__search-dropdown-not-found">
                <FaListCheck className='dashboard--searchbar__search-dropdown-not-found-icon'/>

                no locations matching "la" was found
              </div>

              {/* found / search-results */}
              <ul className="dashboard--searchbar__search-dropdown-result-list">
                {/* result */}
                <DropdownMenu.Item asChild>
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
                </DropdownMenu.Item>
                
                {/* result */}
                <DropdownMenu.Item asChild>
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
                </DropdownMenu.Item>
                
                {/* result */}
                <DropdownMenu.Item asChild>
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
                </DropdownMenu.Item>
              </ul>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      </div>

      {/* dashboard location summary */}
      <div className="dashboard--summary">
        {/* summary data */}
        <div className="dashboard--summary__data">
          <FaCloudSunRain className='dashboard--summary__display-icon'/>

          <div className="dashboard--summary__info">
            <span className="dashboard--summary__location">
              <FaLocationDot className='dashboard--summary__location-icon'/>

              lagos
            </span>

            <span className="dashboard--summary__temperature">
              27 <sup>o</sup> C
            </span>

            <span className='dashboard--summary__description'>
              partly cloudy
            </span>
          </div>
        </div>

        {/* loading */}
        <div className="dashboard--summary__loader">
          <FaSpinner className='dashboard--summary__loader-icon'/>

          <div className="dashboard--summary__loader-text">
            loading weather data for your location
          </div>
        </div>
        
        {/* error */}
        <div className="dashboard--summary__error">
          <FaSpinner className='dashboard--summary__error-icon'/>

          <span className="dashboard--summary__error-text">
            error loading location data
          </span>

          <button className="dashboard--summary__error-btn">
            <FaRotateRight className='dashboard--summary__error-btn-icon'/>

            retry
          </button>
        </div>

        {/* permission not-granted */}
        <div className="dashboard--summary__perm-not-granted">
          <FaClipboardQuestion className='dashboard--summary__perm-not-granted-icon'/>

          <span className="dashboard--summary__perm-not-granted-text">
            you have not granted location access
          </span>

          <button className="dashboard--summary__perm-not-granted-btn">
            <FaCircleQuestion className='dashboard--summary__perm-not-granted-btn-icon'/>

            grant access
          </button>
        </div>
      </div>

      {/* dashboard sub-heading */}
      <h2 className='dashboard--subheading'>
        weather forcast
      </h2>

      {/* dashboard weather forecast */}
      <div className="dashboard--forecast">
        {/* forecast data */}
        <div className="dashboard--forecast__data">
          {/* forecast date filters */}
          <ul className="dashboard--forecast__date-filters">
            <li className="dashboard--forecast__date-filter">
              today
            </li>
            
            <li className="dashboard--forecast__date-filter">
              tomorrow
            </li>
            
            <li className="dashboard--forecast__date-filter">
              13 jun
            </li>
            
            <li className="dashboard--forecast__date-filter">
              14 jun
            </li>
          </ul>

          {/* forecast predictions */}
          <ul className="dashboard--forecast__predictions">
            {/* prediction */}
            <li className="dashboard--forecast__prediction">
              <FaCloudSunRain className='dashboard--forecast__prediction-icon'/>

              <span className="dashboard--forecast__prediction-text">
                27 <sup>o</sup> C ( sunny rain )
              </span>

              <span className='dashboard--forecast__prediction-time'>
                5:30
              </span>
            </li>
            
            {/* prediction */}
            <li className="dashboard--forecast__prediction">
              <FaCloudSunRain className='dashboard--forecast__prediction-icon'/>

              <span className="dashboard--forecast__prediction-text">
                27 <sup>o</sup> C ( sunny rain )
              </span>

              <span className='dashboard--forecast__prediction-time'>
                5:30
              </span>
            </li>
            
            {/* prediction */}
            <li className="dashboard--forecast__prediction">
              <FaCloudSunRain className='dashboard--forecast__prediction-icon'/>

              <span className="dashboard--forecast__prediction-text">
                27 <sup>o</sup> C ( sunny rain )
              </span>

              <span className='dashboard--forecast__prediction-time'>
                5:30
              </span>
            </li>
            
            {/* prediction */}
            <li className="dashboard--forecast__prediction">
              <FaCloudSunRain className='dashboard--forecast__prediction-icon'/>

              <span className="dashboard--forecast__prediction-text">
                27 <sup>o</sup> C ( sunny rain )
              </span>

              <span className='dashboard--forecast__prediction-time'>
                5:30
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
