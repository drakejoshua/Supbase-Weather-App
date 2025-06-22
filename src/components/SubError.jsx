import { FaTriangleExclamation, FaRotateRight } from 'react-icons/fa6'

function SubError({ text, handleRetry }) {
  return (
    <div className="sub-error">
        <FaTriangleExclamation className='sub-error__icon'/>

        <span className="sub-error__text">
            { text }
        </span>

        <button className="sub-error__btn" onClick={ handleRetry }>
            <FaRotateRight className='sub-error__btn-icon'/>

            retry
        </button>
    </div>
  )
}

export default SubError
