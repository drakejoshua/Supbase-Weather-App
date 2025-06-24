import { Dialog, Form } from 'radix-ui'
import FormLogo from '../components/FormLogo'
import '../styles/Forgot-Password.css'
import { FaTriangleExclamation } from 'react-icons/fa6'
import { useDialogProvider } from '../providers/DialogProvider'


function ForgotPassword() {
  const { showDialog } = useDialogProvider()

  function handleFormSubmit(e) {
    // prevent form default behaviour
    e.preventDefault();

    showDialog({
      title: 'recovery email sent',
      content: <p className="forgot-password--dialog__content">
          we've confirmed your email and a recovery link has been sent to it
        </p>
    })
  }

  return (
    <div className='route'>
        <div className="forgot-password">
          <Form.Root className='forgot-password--form' onSubmit={ handleFormSubmit }>
            <FormLogo className="forgot-password--form__logo"/>

            <h1 className="forgot-password--form__heading">
              confirm your email
            </h1>

            <p className="forgot-password--form__text">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta nemo porro tenetur.
            </p>

            <Form.Field className='forgot-password--form__field'>
              <Form.Label className='forgot-password--form__label'>
                email:
              </Form.Label>

              <Form.Control asChild>
                <input type="text" autoComplete='email' className='forgot-password--form__input'/>
              </Form.Control>

              <Form.Message className='forgot-password--form__message'>
                <FaTriangleExclamation className='forgot-password--form__message-icon'/>
                enter your email
              </Form.Message>

              <Form.Submit className='forgot-password--form__submit-btn button-hover'>
                send recovery email
              </Form.Submit>
            </Form.Field>
          </Form.Root>
        </div>
    </div>
  )
}

export default ForgotPassword
