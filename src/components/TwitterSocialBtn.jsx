import React from 'react'
import { FaTwitter } from 'react-icons/fa6'

function TwitterSocialBtn({ text }) {
  return (
    <button type='button' className='social-btn'>
        <FaTwitter className='social-btn__icon'/> { text }
    </button>
  )
}

export default TwitterSocialBtn
