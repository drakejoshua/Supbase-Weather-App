import { Form, unstable_PasswordToggleField as PasswordField } from 'radix-ui'
import { FaRegEye, FaRegEyeSlash, FaTriangleExclamation } from 'react-icons/fa6'
import '../styles/Signup.css'
import { useDialogProvider } from '../providers/DialogProvider'
import FormLogo from '../components/FormLogo'
import FormCarousel from '../components/FormCarousel'
import GoogleSocialBtn from '../components/GoogleSocialBtn'
import TwitterSocialBtn from '../components/TwitterSocialBtn'
import { Link } from 'react-router-dom'


function Signup() {
  const { showDialog } = useDialogProvider();

  function handleFormSubmit(e) {
    // prevent default form submission behaviour
    e.preventDefault();

    showDialog({
      title: 'Check for email confirmation',
      content: <p className='signup--form__submit-content'>
              we just sent a link to your email, please confirm to finish
              creating your account.
            </p>
    })
  }

  return (
    <div className='signup'>
      {/* signin form */}
      <Form.Root className='signup--form' onSubmit={ handleFormSubmit }>
        <FormLogo className="signup--form__logo"/>

        <h1 className="signup--form__heading">
          sign up
        </h1>

        <div className="signup--form__field-group">
          {/* email */}
          <Form.Field className='signup--form__field'>
            <Form.Label className='signup--form__label'>
              email:
            </Form.Label>

            <Form.Control asChild>
              <input type="email" className='signup--form__input'/>
            </Form.Control>

            <Form.Message className='signup--form__message'>
              <FaTriangleExclamation className='signup--form__message-icon'/>

              Enter your email
            </Form.Message>
          </Form.Field>
          
          {/* password */}
          <Form.Field className='signup--form__field'>
            <Form.Label className='signup--form__label'>
              password:
            </Form.Label>

            <Form.Control asChild>
              <PasswordField.Root asChild>
                <div className="signup--form__password-ctn">
                  <PasswordField.Input className='signup--form__password-input'/>

                  <PasswordField.Toggle className='signup--form__password-toggle'>
                    <PasswordField.Icon className='signup--form__password-icon'
                      visible={<FaRegEyeSlash/>}
                      hidden={<FaRegEye/>}
                    />
                  </PasswordField.Toggle>
                </div>
              </PasswordField.Root>
            </Form.Control>

            <Form.Message match='valueMissing' className='signup--form__message'>
              Enter your email
            </Form.Message>

          </Form.Field>
        </div>


        <Form.Submit className='signup--form__submit-btn'>
          sign up
        </Form.Submit>

        <span className="signup-form__signin-link">
          Already have an account? <Link to='/signin'> signin </Link>
        </span>

        <div className='signup--form__social-ctn'>
          {/* google social sign-in button */}
          <GoogleSocialBtn text="sign up with google"/>
          
          {/* twitter social sign-in button */}
          <TwitterSocialBtn text="sign up with twitter"/>
        </div>
      </Form.Root>

      {/* signin carousel */}
      <FormCarousel className={'signup--form__carousel'}/>
    </div>
  )
}

export default Signup
