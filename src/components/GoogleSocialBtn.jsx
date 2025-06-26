import { FaGoogle } from 'react-icons/fa6'
import { useAuth } from '../providers/AuthProvider'

function GoogleSocialBtn({ text }) {
  // auth context and helper functions
  const { signInUsingGoogle } = useAuth()

  return (
    <button type='button' className='social-btn' onClick={ signInUsingGoogle }>
        <FaGoogle className='social-btn__icon'/> { text }
    </button>
  )
}

export default GoogleSocialBtn
