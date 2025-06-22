import { FaCloudSunRain } from 'react-icons/fa6'

function ForecastData({ data }) {
  return (
    <div className="dashboard--forecast__data">
        <ul className="dashboard--forecast__date-filters">
            <div className="dashboard--forecast__date-filters-track">
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

            <li className="dashboard--forecast__date-filter">
                14 jun
            </li>
            
            <li className="dashboard--forecast__date-filter">
                14 jun
            </li>
            </div>
        </ul>

        <ul className="dashboard--forecast__predictions">
            <li className="dashboard--forecast__prediction">
            <FaCloudSunRain className='dashboard--forecast__prediction-icon'/>

            <span className="dashboard--forecast__prediction-text">
                27*C <span className="dashboard--forecast__prediction-sub-text"> ( very sunny ) </span>
            </span>

            <span className='dashboard--forecast__prediction-time'>
                5:30
            </span>
            </li>
            
            <li className="dashboard--forecast__prediction">
            <FaCloudSunRain className='dashboard--forecast__prediction-icon'/>

            <span className="dashboard--forecast__prediction-text">
                27*C <span className="dashboard--forecast__prediction-sub-text"> ( very sunny ) </span>
            </span>

            <span className='dashboard--forecast__prediction-time'>
                5:30
            </span>
            </li>
            
            <li className="dashboard--forecast__prediction">
            <FaCloudSunRain className='dashboard--forecast__prediction-icon'/>

            <span className="dashboard--forecast__prediction-text">
                27*C <span className="dashboard--forecast__prediction-sub-text"> ( very sunny ) </span>
            </span>

            <span className='dashboard--forecast__prediction-time'>
                5:30
            </span>
            </li>
            
            <li className="dashboard--forecast__prediction">
            <FaCloudSunRain className='dashboard--forecast__prediction-icon'/>

            <span className="dashboard--forecast__prediction-text">
                27*C <span className="dashboard--forecast__prediction-sub-text"> ( very sunny ) </span>
            </span>

            <span className='dashboard--forecast__prediction-time'>
                5:30
            </span>
            </li>
        </ul>
    </div>
  )
}

export default ForecastData
