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
import { useUserProvider } from '../providers/UserProvider'
import Spinner from '../components/Spinner'


function Signin() {
  // react-router navigate function
  const navigateTo = useNavigate()

  const { getUserFromSupabase } = useUserProvider()

  // dialog provider helper function
  const { showDialog } = useDialogProvider();

  // auth context and helper functions
  const { signInUsingEmail } = useAuth()

  // input states
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  // form states
  const [ loading, setLoading ] = useState( false );


  async function handleFormSubmit(e) {
    // prevent default form submission behaviour
    e.preventDefault();

    setLoading( true )

    try {
      const { success, error } = await signInUsingEmail( email, password );

      if ( success ) {
        navigateTo('/')
      } else {
        switch( error.code ) {
          case 'email_not_confirmed':
            showDialog({
              title: 'Your email has not been confirmed',
              content: <div className='signin--form__dialog-content'>
                          <p className="signin--form__dialog-text">
                            you need to confirm your email before you can login
                          </p>

                          <button className="signin--form__dialog-btn">
                            send email confirmation
                          </button>
                    </div>
            })
          break;
          
          case 'invalid_credentials':
            showDialog({
              title: 'Incorrect email or password',
              content: <div className='signin--form__dialog-content'>
                          <p className="signin--form__dialog-text">
                            the email or password you entered was incorrect
                          </p>
                    </div>
            })
          break;

          default:
            showDialog({
              title: 'Error signing up',
              content: <div className='signin--form__dialog-content'>
                          <p className="signin--form__dialog-text">
                            there was an error signing you up. <br />
                            error: { error.code }
                          </p>
                    </div>
            })
        }
        
      }
    } catch( err ) {
      showDialog({
        title: 'Error signing up',
        content: <div className='signin--form__dialog-content'>
                    <p className="signin--form__dialog-text">
                      there was an error signing you up. <br />
                      error: { err.code }
                    </p>
              </div>
      })
    } finally {
      setLoading( false )
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

        <Link className="signin--form__forgot-password-text" to='/forgot-password'>
          forgot password?
        </Link>


        <Form.Submit className='signin--form__submit-btn button-hover' disabled={ loading }>
          { loading == false && <> sign in </>}
          { loading && <> <Spinner className='signin--form__submit-btn-spinner'/> loading.. </>}
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
