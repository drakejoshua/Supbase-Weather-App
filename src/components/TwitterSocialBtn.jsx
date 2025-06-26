import { useAuth } from '../providers/AuthProvider'
import { FaTwitter } from 'react-icons/fa6'

function TwitterSocialBtn({ text }) {
  const { signInUsingTwitter } = useAuth()

  return (
    <button type='button' className='social-btn' onClick={ signInUsingTwitter  }>
        <FaTwitter className='social-btn__icon'/> { text }
    </button>
  )
}

export default TwitterSocialBtn
