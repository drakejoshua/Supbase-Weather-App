import { useEffect, useState } from 'react'
import FormLogo from '../components/FormLogo'
import '../styles/EmailConfirmed.css'
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6'
import { useAuth } from '../providers/AuthProvider'
import { useToastProvider } from '../providers/ToastProvider'
import { useDialogProvider } from '../providers/DialogProvider'
import Spinner from '../components/Spinner'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useUserProvider } from '../providers/UserProvider'
import supabase from '../providers/SupabaseProvider'

function EmailConfirmed() {
    const [isEmailConfirmed, setIsEmailConfirmed] = useState(false) // set to false to test expired state

    const { session, resendEmail } = useAuth()
    const siteURL = import.meta.env.VITE_SITE_URL

    const [ searchParams, setSearchParams ] = useSearchParams()

    const navigateTo = useNavigate()

    const { addNewUser } = useUserProvider()

    const { showToast } = useToastProvider()

    const { showDialog } = useDialogProvider()

    const [ loading, setLoading ] = useState( false )

    async function handleResendConfirmation() {
        try {
            const emailToResend = searchParams.get('email')

            if ( !emailToResend ) {
                throw new Error('resend email not found, try sign-in again')
            }

            const { success, error } = await resendEmail(emailToResend, 'signup', `${ siteURL }/email-confirmed?email=${ emailToResend }`);
            setLoading( true )

            if ( success ) {
                showToast({
                    title: 'Email confirmation sent'
                })
            } else {
                showDialog({
                    title: 'Error sending confirmation email',
                    content: <p className="email-confirmed--dialog__text">
                        there was an error sending the email confirmation link. <br />
                        Error: { error.message }
                    </p>
                })
            }
        } catch( err ) {
            showDialog({
                title: 'Error sending confirmation email',
                content: <p className="email-confirmed--dialog__text">
                    there was an error sending the email confirmation link. <br />
                    Error: { err.message }
                </p>
            })
        } finally {
            setLoading( false )
        }
    }

    async function addUserInfoToDatabase() {
        const { success: addUserSuccess, error: addUserError } = await addNewUser({
          email: session.user.email
        })

        if ( addUserSuccess ) {
            navigateTo('/')
        } else {
          // alert user about error 
          showDialog({
            title: 'Error updating your data',
            content: <div className='email-confirmed--dialog__content'>
              <p className="email-confirmed--dialog__text">
                There was an error updating you email status. Error: { addUserError.code }
              </p>
              
              <button className="email--confirmed--dialog__button" onClick={ addUserInfoToDatabase }>
                try again
              </button>
            </div>
          })
        }
    }

    async function verifyUserConfirmation() {
        try {
            const tokenHash = searchParams.get('hash')
            console.log('token hash: ', tokenHash )

            if ( !tokenHash ) {
                throw new Error()
            }

            const { error } = await supabase.auth.verifyOtp({ token_hash: tokenHash, type: 'email'})

            if ( error ) {
                console.log('eror')
                throw new Error()
            } else {
                console.log('success')
                setIsEmailConfirmed( true )
            }
        } catch( err ) {
            setIsEmailConfirmed( false )
        }
    }

    useEffect( function() {
        verifyUserConfirmation()
    }, [])

    useEffect( function() {
        if ( isEmailConfirmed ) {
            addUserInfoToDatabase()
        }
    }, [ isEmailConfirmed ])

    return (
        <div className='route'>
            <div className="email-confirmed">
                <div className='email-confirmed--box'>
                    <FormLogo className="email-confirmed--box__logo" />

                    {isEmailConfirmed ? (
                        <>
                            <FaCircleCheck className="email-confirmed--box__icon" />
                            <h1 className="email-confirmed--box__heading">
                                email confirmed
                            </h1>
                            <p className="email-confirmed--box__text">
                                Your email has been successfully confirmed. 
                                You'll be redirected shortly...
                            </p>
                        </>
                    ) : (
                        <>
                            <FaCircleExclamation className="email-confirmed--box__icon email-confirmed--box__icon--expired" />
                            <h1 className="email-confirmed--box__heading">
                                confirmation expired
                            </h1>
                            <p className="email-confirmed--box__text">
                                Your email confirmation link has expired. Please try again.
                            </p>
                            <button
                                className="email-confirmed--box__btn button-hover"
                                onClick={ handleResendConfirmation }
                            >
                                { loading && <> <Spinner/> loading... </> }
                                { loading == false && <> resend confirmation email </> }
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default EmailConfirmed