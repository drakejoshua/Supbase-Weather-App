import { FaSpinner } from "react-icons/fa6"

function Spinner({ className, ...props }) {
  return (
    <FaSpinner className={`spinner ${ className }`} { ...props }/>
  )
}

export default Spinner
