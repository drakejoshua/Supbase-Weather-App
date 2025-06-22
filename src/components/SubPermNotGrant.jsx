import { FaClipboardQuestion, FaCircleQuestion } from 'react-icons/fa6'

function SubPermNotGrant({ text, handleRequest }) {
  return (
    <div className="dashboard--summary__perm-not-granted">
        <FaClipboardQuestion className='dashboard--summary__perm-not-granted-icon'/>

        <span className="dashboard--summary__perm-not-granted-text">
            { text }
        </span>

        <button className="dashboard--summary__perm-not-granted-btn" onClick={ handleRequest }>
            <FaCircleQuestion className='dashboard--summary__perm-not-granted-btn-icon'/>

            grant access
        </button>
    </div>
  )
}

export default SubPermNotGrant
