import { FaCloudSunRain } from 'react-icons/fa6'

function FormLogo({ className, ...props }) {
  return (
    <div className={`form-logo ${ className }`} { ...props }>
        <FaCloudSunRain className='form-logo__icon'/>

        InstaWeather
    </div>
  )
}

export default FormLogo
