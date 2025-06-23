import { FaGoogle } from 'react-icons/fa6'

function GoogleSocialBtn({ text }) {
  return (
    <button type='button' className='social-btn'>
        <FaGoogle className='social-btn__icon'/> { text }
    </button>
  )
}

export default GoogleSocialBtn
