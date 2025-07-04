import { FaLocationDot } from "react-icons/fa6"
import WeatherIcons from "../providers/WeatherIcons"

function SummaryData({ iconCode, location, temperature, description }) {
  const Icon = WeatherIcons[ iconCode ];
  const celciusFormatter = Intl.NumberFormat( 'en-US', {
    style: 'unit',
    unit: 'celsius',
    unitDisplay: 'short',
    maximumFractionDigits: 0
  })

  return (
    <div className="summary-data">
        <Icon className='summary-data__display-icon'/>

        <div className="summary-data__info">
            <span className="summary-data__location">
                <FaLocationDot className='summary-data__location-icon'/>

                { location }
            </span>

            <span className="summary-data__temperature">
                { celciusFormatter.format(temperature) }
            </span>

            <span className='summary-data__description'>
                { description }
            </span>
        </div>
    </div>
  )
}

export default SummaryData
