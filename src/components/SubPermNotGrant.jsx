import { FaClipboardQuestion, FaCircleQuestion } from 'react-icons/fa6'

function SubPermNotGrant({ text, handleRequest }) {
  return (
    <div className="sub-perm-not-granted">
        <FaClipboardQuestion className='sub-perm-not-granted__icon'/>

        <span className="sub-perm-not-granted__text">
            { text }
        </span>

        <button className="sub-perm-not-granted__btn button-hover" onClick={ handleRequest }>
            <FaCircleQuestion className='sub-perm-not-granted__btn-icon'/>

            grant access
        </button>
    </div>
  )
}

export default SubPermNotGrant
