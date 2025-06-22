import Spinner from "./Spinner"

function SubLoader({ text }) {
  return (
    <div className="sub-loader">
        <Spinner className='sub-loader__icon'/>

        <div className="sub-loader__text">
            { text }
        </div>
    </div>
  )
}

export default SubLoader
