import { Form } from 'radix-ui'
import FormLogo from '../components/FormLogo'
import '../styles/Forgot-Password.css'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { useDialogProvider } from '../providers/DialogProvider'
import { useAuth } from '../providers/AuthProvider'
import { useState } from 'react'
import Spinner from '../components/Spinner'


function ForgotPassword() {
  const { showDialog } = useDialogProvider()

  const [ email, setEmail ] = useState('');

  const { signInUsingEmailWithoutPassword } = useAuth()

  const [ loading, setLoading ] = useState( false )

  async function handleFormSubmit(e) {
    // prevent form default behaviour
    e.preventDefault();

    try {
      setLoading( true )

      const { success, error } = await signInUsingEmailWithoutPassword( email );

      if ( success ) {
        showDialog({
          title: 'recovery email sent',
          content: <p className="forgot-password--dialog__content">
              we've confirmed your email and a recovery link has been sent to it. 
              the link expires in the next 2 minutes
            </p>
        })
      } else {
        showDialog({
          title: 'Error sending recovery email',
          content: <p className="forgot-password--dialog__content">
              There was an error sending your recovery email, please try again. <br />
              Error: { error.message }
            </p>
        })
      }
    } catch( err ) {
      showDialog({
        title: 'Error sending recovery email',
        content: <p className="forgot-password--dialog__content">
            There was an error sending your recovery email, please try again. <br />
            Error: { err.message }
          </p>
      })
    } finally {
      setLoading( false )
    }
  }

  return (
    <div className='route'>
        <div className="forgot-password">
          <Form.Root className='forgot-password--form' onSubmit={ handleFormSubmit }>
            <FormLogo className="forgot-password--form__logo"/>

            <h1 className="forgot-password--form__heading">
              Forgot your password?
            </h1>

            <p className="forgot-password--form__text">
              Enter your email address below and we'll send you a link to recover and signin
              to your account
            </p>

            <Form.Field className='forgot-password--form__field'>
              <Form.Label className='forgot-password--form__label'>
                Email address:
              </Form.Label>

              <Form.Control asChild>
                <input 
                  type="email"
                  autoComplete='email'
                  className='forgot-password--form__input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Control>

              <Form.Message className='forgot-password--form__message' match="valueMissing">
                <FaTriangleExclamation className='forgot-password--form__message-icon'/>
                Please enter your email address
              </Form.Message>
              
              <Form.Message className='forgot-password--form__message' match='typeMismatch'>
                <FaTriangleExclamation className='forgot-password--form__message-icon'/>
                Please enter a valid email address.
              </Form.Message> 
            </Form.Field>
            
            <Form.Submit className='forgot-password--form__submit-btn button-hover'>
              { loading === false && <>Send reset link</> }
              { loading && <><Spinner className="forgot-password--form__submit-spinner"/> Sending... </> }
            </Form.Submit>
          </Form.Root>
        </div>
    </div>
  )
}

export default ForgotPassword
