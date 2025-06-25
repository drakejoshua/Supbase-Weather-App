import React from 'react'
import Spinner from './Spinner'

function RouteLoader({ text }) {
  return (
    <div className="route-loader">
        <Spinner className='route-loader__icon'/>

        <span className="route-loader__text">
            { text }
        </span>
    </div>
  )
}

export default RouteLoader
