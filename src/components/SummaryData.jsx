import { FaCloudSunRain, FaLocationDot } from "react-icons/fa6"

function SummaryData({ location, temperature, description }) {
  return (
    <div className="dashboard--summary__data">
        <FaCloudSunRain className='dashboard--summary__display-icon'/>

        <div className="dashboard--summary__info">
            <span className="dashboard--summary__location">
                <FaLocationDot className='dashboard--summary__location-icon'/>

                { location }
            </span>

            <span className="dashboard--summary__temperature">
                { temperature }
            </span>

            <span className='dashboard--summary__description'>
                { description }
            </span>
        </div>
    </div>
  )
}

export default SummaryData
