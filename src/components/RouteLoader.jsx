import React from 'react'
import { FaTriangleExclamation } from 'react-icons/fa6'

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
