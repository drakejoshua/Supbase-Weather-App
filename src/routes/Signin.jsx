import { Form, unstable_PasswordToggleField as PasswordField } from 'radix-ui'
import { FaGoogle, FaRegEye, FaRegEyeSlash, FaTriangleExclamation, FaTwitter } from 'react-icons/fa6'
import '../styles/Signin.css'
import { useDialogProvider } from '../providers/DialogProvider'
import FormLogo from '../components/FormLogo'
import FormCarousel from '../components/FormCarousel'
import GoogleSocialBtn from '../components/GoogleSocialBtn'
import TwitterSocialBtn from '../components/TwitterSocialBtn'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../providers/AuthProvider'


function Signin() {
  // react-router navigate function
  const navigateTo = useNavigate()

  // dialog provider helper function
  const { showDialog } = useDialogProvider();

  // auth context and helper functions
  const { signInUsingEmail } = useAuth()

  // input states
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  // form states
  const [ loading, setLoading ] = useState();
  const [ error, setError ] = useState();


  async function handleFormSubmit(e) {
    // prevent default form submission behaviour
    e.preventDefault();

    try {
      const { success, error } = await signInUsingEmail( email, password );

      if ( success ) {
        navigateTo('/')
      } else {
        switch( error.code ) {
          case 'email_not_confirmed':
            showDialog({
              title: 'Incorrect Password',
              content: <p className='signin--form__submit-content'>
                      The password you entered was incorrect
                    </p>
            })
          break;
        }
        
      }
    } catch {
      setError()
    }

  }

  return (
    <div className='signin'>
      {/* signin form */}
      <Form.Root className='signin--form' onSubmit={ handleFormSubmit }>
        <FormLogo className="signin--form__logo"/>

        <h1 className="signin--form__heading">
          sign in
        </h1>

        <div className="signin--form__field-group">
          {/* email */}
          <Form.Field className='signin--form__field'>
            <Form.Label className='signin--form__label'>
              email:
            </Form.Label>

            <Form.Control asChild>
              <input type="email" 
                className='signin--form__input' 
                value={ email } 
                onChange={ (e) => setEmail( e.target.value )}
                autoComplete='email'
              />
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
                  <PasswordField.Input className='signin--form__password-input' value={ password } onChange={ (e) => setPassword( e.target.value )}/>

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


        <Form.Submit className='signin--form__submit-btn button-hover'>
          sign in
        </Form.Submit>

        <span className="signin-form__signup-link">
          Don't have an account? <Link to='/signup'> signup </Link>
        </span>

        <div className='signin--form__social-ctn'>
          {/* google social sign-in button */}
          <GoogleSocialBtn text="sign in with google"/>
          
          {/* twitter social sign-in button */}
          <TwitterSocialBtn text="sign in with twitter"/>
        </div>
      </Form.Root>

      {/* signin carousel */}
      <FormCarousel className={'signin--form__carousel'}/>
    </div>
  )
}

export default Signin
