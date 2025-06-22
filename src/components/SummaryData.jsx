import { FaCloudSunRain, FaLocationDot } from "react-icons/fa6"

function SummaryData({ location, temperature, description }) {
  return (
    <div className="summary-data">
        <FaCloudSunRain className='summary-data__display-icon'/>

        <div className="summary-data__info">
            <span className="summary-data__location">
                <FaLocationDot className='summary-data__location-icon'/>

                { location }
            </span>

            <span className="summary-data__temperature">
                { temperature }
            </span>

            <span className='summary-data__description'>
                { description }
            </span>
        </div>
    </div>
  )
}

export default SummaryData
