import { Form, unstable_PasswordToggleField as PasswordField } from 'radix-ui'
import { FaRegEye, FaRegEyeSlash, FaTriangleExclamation } from 'react-icons/fa6'
import '../styles/Signup.css'
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



function Signup() {
  // react-router navigate function
  const navigateTo = useNavigate()

  // app's user context and helper functions
  const { addNewUser } = useUserProvider()

  // dialog provider helper function
  const { showDialog } = useDialogProvider();

  // auth context and helper functions
  const { signUpUsingEmail, signInUsingGoogle } = useAuth()

  // input states
  const [ email, setEmail ] = useState();
  const [ password, setPassword ] = useState();

  // form states
  const [ loading, setLoading ] = useState( false );
  const [ error, setError ] = useState(null);

  async function handleFormSubmit(e) {
    // prevent default form submission behaviour
    e.preventDefault();

    try {
      // update form state
      setLoading( true );
      setError( null )

      // request user sign-up using email and password on supabase
      const { success, error: signUpError, data } = await signUpUsingEmail( email, password );

      if ( success ) {
        const { success: addUserSuccess, error: addUserError } = await addNewUser({
          email: data.user.email
        })

        if ( addUserSuccess ) {
          // alert user to check for email confirmation
          showDialog({
            title: 'Check for email confirmation',
            content: <p className='signup--form__submit-content'>
                    we just sent a link to your email, please confirm to finish
                    creating your account.
                  </p>
          })
        } else {
          // update form state
          setError( addUserError );

          // alert user about error 
          showDialog({
            title: 'Error during Signup',
            content: <p className='signup--form__submit-content'>
              Something went wrong. Please try again or use a different email. Error: { addUserError.code }
            </p>
          })
        }

      } else {
        // update form state
        setError( signUpError );

        // alert user about error 
        showDialog({
          title: 'Error during Signup',
          content: <p className='signup--form__submit-content'>
            Something went wrong. Please try again or use a different email. Error: { signUpError.code }
          </p>
        })
      }
    } catch ( err ) {
      // update form state
      setError( err );

      // alert user about error 
      showDialog({
        title: 'Error during Signup',
        content: <p className='signup--form__submit-content'>
          Something went wrong. Please try again or use a different email. Error: { err.message }
        </p>
      })
    } finally {
      setLoading( false )
    }

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
              <input 
                type="email" 
                className='signup--form__input' 
                value={ email } 
                onChange={ (e) => setEmail( e.target.value )} 
                autoComplete='email'
                required
              />
            </Form.Control>

            <Form.Message className='signup--form__message' match="valueMissing">
              <FaTriangleExclamation className='signup--form__message-icon'/>

              Enter your email
            </Form.Message>
            
            <Form.Message className='signup--form__message' match="typeMismatch">
              <FaTriangleExclamation className='signup--form__message-icon'/>

              Enter a valid email
            </Form.Message>
          </Form.Field>
          
          {/* password */}
          <Form.Field className='signup--form__field'>
            <Form.Label className='signup--form__label'>
              password:
            </Form.Label>

              <PasswordField.Root asChild>
                <div className="signup--form__password-ctn">
                  <Form.Control asChild>
                    <PasswordField.Input className='signup--form__password-input' value={ password } onChange={ (e) => setPassword( e.target.value )} required/>
                  </Form.Control>

                  <PasswordField.Toggle className='signup--form__password-toggle'>
                    <PasswordField.Icon className='signup--form__password-icon'
                      visible={<FaRegEyeSlash/>}
                      hidden={<FaRegEye/>}
                    />
                  </PasswordField.Toggle>
                </div>
              </PasswordField.Root>

            <Form.Message className='signup--form__message' match="valueMissing">
              <FaTriangleExclamation className='signup--form__message-icon'/>

              Enter your password
            </Form.Message>
          </Form.Field>
        </div>


        <Form.Submit className='signup--form__submit-btn button-hover' disabled={ loading }>
          { loading == false && <> sign up </>}
          { loading && <> <Spinner className='signup--form__submit-btn-spinner'/> loading.. </>}
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
