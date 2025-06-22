import { FaCloudSunRain } from 'react-icons/fa6'

function ForecastData({ data }) {
  return (
    <div className="forecast-data__data">
        <ul className="forecast-data__date-filters">
            <div className="forecast-data__date-filters-track">
            <li className="forecast-data__date-filter">
                today
            </li>
            
            <li className="forecast-data__date-filter">
                tomorrow
            </li>
            
            <li className="forecast-data__date-filter">
                13 jun
            </li>
            
            <li className="forecast-data__date-filter">
                14 jun
            </li>

            <li className="forecast-data__date-filter">
                14 jun
            </li>
            
            <li className="forecast-data__date-filter">
                14 jun
            </li>
            </div>
        </ul>

        <ul className="forecast-data__predictions">
            <li className="forecast-data__prediction">
            <FaCloudSunRain className='forecast-data__prediction-icon'/>

            <span className="forecast-data__prediction-text">
                27*C <span className="forecast-data__prediction-sub-text"> ( very sunny ) </span>
            </span>

            <span className='forecast-data__prediction-time'>
                5:30
            </span>
            </li>
            
            <li className="forecast-data__prediction">
            <FaCloudSunRain className='forecast-data__prediction-icon'/>

            <span className="forecast-data__prediction-text">
                27*C <span className="forecast-data__prediction-sub-text"> ( very sunny ) </span>
            </span>

            <span className='forecast-data__prediction-time'>
                5:30
            </span>
            </li>
            
            <li className="forecast-data__prediction">
            <FaCloudSunRain className='forecast-data__prediction-icon'/>

            <span className="forecast-data__prediction-text">
                27*C <span className="forecast-data__prediction-sub-text"> ( very sunny ) </span>
            </span>

            <span className='forecast-data__prediction-time'>
                5:30
            </span>
            </li>
            
            <li className="forecast-data__prediction">
            <FaCloudSunRain className='forecast-data__prediction-icon'/>

            <span className="forecast-data__prediction-text">
                27*C <span className="forecast-data__prediction-sub-text"> ( very sunny ) </span>
            </span>

            <span className='forecast-data__prediction-time'>
                5:30
            </span>
            </li>
        </ul>
    </div>
  )
}

export default ForecastData
