import Spinner from "./Spinner"

function SubLoader({ text }) {
  return (
    <div className="dashboard--summary__loader">
        <Spinner className='dashboard--summary__loader-icon'/>

        <div className="dashboard--summary__loader-text">
            { text }
        </div>
    </div>
  )
}

export default SubLoader
