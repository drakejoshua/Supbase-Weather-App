import { useMemo, useState } from 'react';
import { FaCloudSunRain } from 'react-icons/fa6'
import WeatherIcons from '../providers/WeatherIcons';

function ForecastData({ data }) {
  function groupWeatherDataByDay(weatherData) {
    const groupedData = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of today

    weatherData.forEach(item => {
        const itemDate = new Date(item.dt * 1000); // Convert Unix timestamp to milliseconds
        itemDate.setHours(0, 0, 0, 0); // Normalize to start of the day for comparison

        let category;

        if (itemDate.getTime() === today.getTime()) {
            category = 'Today';
        } else {
            const tomorrow = new Date(today);
            tomorrow.setDate(today.getDate() + 1);

            if (itemDate.getTime() === tomorrow.getTime()) {
                category = 'Tomorrow';
            } else {
                // Format as "DayOfMonth Mon" (e.g., "12 Jul")
                const options = {
                    day: 'numeric',
                    month: 'short'
                };
                category = itemDate.toLocaleDateString('en-US', options);
            }
        }

        if (!groupedData[category]) {
            groupedData[category] = [];
        }

        groupedData[category].push(item);
    });

    return groupedData;
  }

  const groupedWeatherData = useMemo( function() {
    return groupWeatherDataByDay( data )
  }, [ data ])

  //   console.log('grouped data: ', groupedWeatherData )
  const [ currentFilter, setCurrentFilter ] = useState( Object.keys( groupedWeatherData )[0] )

  return (
    <div className="forecast-data__data">
        <ul className="forecast-data__date-filters">
            <div className="forecast-data__date-filters-track">
                { Object.keys(groupedWeatherData).map(function( day, index ) {
                    return <li className={`forecast-data__date-filter ${ currentFilter == day ? 'active' : '' }`} 
                                key={index} 
                                onClick={() => setCurrentFilter( day )}
                            >
                                { day }
                            </li>
                })}
            </div>
        </ul>

        <ul className="forecast-data__predictions">
            {
                groupedWeatherData[ currentFilter ].map( function( forecast, index ) {
                    const Icon = WeatherIcons[ forecast.weather[0].icon ]
                    const timeFormatter = Intl.DateTimeFormat( undefined, {
                        hour: 'numeric',
                        minute: 'numeric',
                        hour12: true
                    })
                    const celsiusFormater = Intl.NumberFormat( undefined, {
                        style: 'unit',
                        unit: 'celsius',
                        unitDisplay: 'short',
                        maximumFractionDigits: 0
                    })
                    const forecastDateObject = new Date( forecast.dt * 1000 )  // convert UNIx timestamp to milliseconds

                    return <li className="forecast-data__prediction" key={ index }>
                            <Icon className='forecast-data__prediction-icon'/>

                            <span className="forecast-data__prediction-text">
                                { celsiusFormater.format( forecast.main.temp ) } 
                                <span className="forecast-data__prediction-sub-text"> ( { forecast.weather[0].description } ) </span>
                            </span>

                            <span className='forecast-data__prediction-time'>
                                { timeFormatter.format( forecastDateObject ) }
                            </span>
                        </li>
                })
            }
        </ul>
    </div>
  )
}

export default ForecastData
