import { FaTriangleExclamation, FaRotateRight } from 'react-icons/fa6'

function SubError({ text, handleRetry }) {
  return (
    <div className="dashboard--summary__error">
        <FaTriangleExclamation className='dashboard--summary__error-icon'/>

        <span className="dashboard--summary__error-text">
            { text }
        </span>

        <button className="dashboard--summary__error-btn" onClick={ handleRetry }>
            <FaRotateRight className='dashboard--summary__error-btn-icon'/>

            retry
        </button>
    </div>
  )
}

export default SubError
