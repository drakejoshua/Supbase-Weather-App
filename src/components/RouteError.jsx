import React from 'react'
import { FaTriangleExclamation, FaRotateRight } from 'react-icons/fa6'

function RouteError({ text, handleRetry }) {
  return (
    <div className="route-error">
        <FaTriangleExclamation className='route-error__icon'/>

        <p className="route-error__text">
          { text }
        </p>

        <button className="route-error__retry-btn" onClick={ handleRetry }>
          <FaRotateRight className='route-error__retry-icon'/>

          <span className="route-error__retry-text">
            retry
          </span>
        </button>
    </div>
  )
}

export default RouteError
