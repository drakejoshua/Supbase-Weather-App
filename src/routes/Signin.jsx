import { Form, unstable_PasswordToggleField as PasswordField } from 'radix-ui'
import { FaCloudSunRain, FaGoogle, FaRegEye, FaRegEyeSlash, FaTriangleExclamation, FaTwitter } from 'react-icons/fa6'
import sample_img_1 from '../assets/sample_img_1.jpg'
import sample_img_2 from '../assets/sample_img_2.jpg'
import sample_img_3 from '../assets/sample_img_3.jpg'
import '../styles/Signin.css'
import { useEffect, useRef } from 'react'
import { useDialogProvider } from '../providers/DialogProvider'

function Signin() {
  const { showDialog } = useDialogProvider();

  const carouselTrackRef = useRef();
  const carouselRef = useRef();

  function handleFormSubmit(e) {
    // prevent default form submission behaviour
    e.preventDefault();

    showDialog({
      title: 'Incorrect Password',
      content: <p className='signin--form__submit-content'>
              The password you entered was incorrect
            </p>
    })
  }

  function startCarouselAutoPlay() {
    let carouselWitdh = carouselRef.current.getBoundingClientRect().width;
    let numberOfElements = carouselTrackRef.current.childElementCount;
    let initialCount = 0;

    setInterval( function(){
      
      if ( initialCount <= numberOfElements ) {
        carouselTrackRef.current.style.transform = `translateX(-${ initialCount * carouselWitdh }px)`

        if ( initialCount == numberOfElements - 1 ) {
          initialCount = 0;
        } else {
          initialCount += 1;
        }
      }
    }, 6000 )

  }

   useEffect( function() {
    // startCarouselAutoPlay()
   }, [])

  return (
    <div className='signin'>
      {/* signin form */}
      <Form.Root className='signin--form' onSubmit={ handleFormSubmit }>
        <div className="form-logo">
          <FaCloudSunRain className='form-logo__icon'/>

          InstaWeather
        </div>

        <div className="signin--form__field-group">
          {/* email */}
          <Form.Field className='signin--form__field'>
            <Form.Label className='signin--form__label'>
              email:
            </Form.Label>

            <Form.Control asChild>
              <input type="email" className='signin--form__input'/>
            </Form.Control>

            <Form.Message className='signin--form__message'>
              <FaTriangleExclamation className='signin--form__message-icon'/>

              Enter your email
            </Form.Message>
          </Form.Field>
          
          {/* password */}
          <Form.Field className='signin--form__field'>
            <Form.Label className='signin--form__label'>
              password:
            </Form.Label>

            <Form.Control asChild>
              <PasswordField.Root asChild>
                <div className="signin--form__password-ctn">
                  <PasswordField.Input className='signin--form__password-input'/>

                  <PasswordField.Toggle className='signin--form__password-toggle'>
                    <PasswordField.Icon className='signin--form__password-icon'
                      visible={<FaRegEyeSlash/>}
                      hidden={<FaRegEye/>}
                    />
                  </PasswordField.Toggle>
                </div>
              </PasswordField.Root>
            </Form.Control>

            <Form.Message match='valueMissing' className='signin--form__message'>
              Enter your email
            </Form.Message>

          </Form.Field>
        </div>

        <span className="signin--form__forgot-password-text">
          forgot password?
        </span>


        <Form.Submit className='sigin--form__submit-btn'>
          sign in
        </Form.Submit>

        <div className='signin--form__social-ctn'>
          {/* google social sign-in button */}
          <button type='button' className='signin--form__social-btn'>
            <FaGoogle className='signin--form__social-btn-icon'/> sign in with google
          </button>
          
          {/* twitter social sign-in button */}
          <button type='button' className='signin--form__social-btn'>
            <FaTwitter className='signin--form__social-btn-icon'/> sign in with twitter
          </button>
        </div>
      </Form.Root>

      {/* signin carousel */}
      <div className="form--carousel" ref={ carouselRef }>
        <div className="form--carousel__track" ref={ carouselTrackRef }>
          <div className="form--carousel__item">
            <img src={ sample_img_1 } alt="image of a meeting" className="form--carousel__item-image" />

            <div className="form--carousel__item-text">
              get the latest weather updates
            </div>
          </div>

          <div className="form--carousel__item">
            <img src={ sample_img_2 } alt="image of a meeting" className="form--carousel__item-image" />

            <div className="form--carousel__item-text">
              search you daily commute
            </div>
          </div>

          <div className="form--carousel__item">
            <img src={ sample_img_3 } alt="image of a meeting" className="form--carousel__item-image" />

            <div className="form--carousel__item-text">
              dont be caught unaware
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
