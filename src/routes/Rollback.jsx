import { useEffect, useState } from 'react'
import FormLogo from '../components/FormLogo'
import '../styles/EmailConfirmed.css'
import { FaCircleCheck, FaCircleExclamation } from 'react-icons/fa6'
import { useAuth } from '../providers/AuthProvider'
import { useToastProvider } from '../providers/ToastProvider'
import { useDialogProvider } from '../providers/DialogProvider'
import Spinner from '../components/Spinner'
import { useNavigate } from 'react-router-dom'
import { useUserProvider } from '../providers/UserProvider'

function Rollback() {
    const { session } = useAuth()
    const { addNewUser } = useUserProvider()
    const { showToast } = useToastProvider()
    const { showDialog } = useDialogProvider()
    const navigateTo = useNavigate()
    const [loading, setLoading] = useState(false)
    const [addUserSuccess, setAddUserSuccess] = useState(null)
    const [ sessionExists, setSessionExists ] = useState( false )

    async function addUserInfoToDatabase() {
        setLoading(true)
        try {
            const { success, error } = await addNewUser({
                email: session.user.email
            })

            if (success) {
                setAddUserSuccess(true)
                showToast({
                    title: 'User added successfully'
                })
                setTimeout(() => navigateTo('/'), 1500)
            } else {
                setAddUserSuccess(false)
                showDialog({
                    title: 'Error adding user',
                    content: (
                        <div className='email-confirmed--dialog__content'>
                            <p className="email-confirmed--dialog__text">
                                There was an error adding the user. Error: {error?.code}
                            </p>
                            <button className="email--confirmed--dialog__button" onClick={addUserInfoToDatabase}>
                                try again
                            </button>
                        </div>
                    )
                })
            }
        } catch (err) {
            setAddUserSuccess(false)
            showDialog({
                title: 'Error adding user',
                content: (
                    <div className='email-confirmed--dialog__content'>
                        <p className="email-confirmed--dialog__text">
                            There was an error adding the user. Error: {err.message}
                        </p>
                        <button className="email--confirmed--dialog__button" onClick={addUserInfoToDatabase}>
                            try again
                        </button>
                    </div>
                )
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect( function() {
        if ( sessionExists ) {
            addUserInfoToDatabase()
        }
    }, [sessionExists])

    useEffect(() => {
        if ( session != 'loading' && session ) {
            setSessionExists( true )
        }
        // eslint-disable-next-line
    }, [session])

    return (
        <div className='route'>
            <div className="email-confirmed">
                <div className='email-confirmed--box'>
                    <FormLogo className="email-confirmed--box__logo" />
                    {loading ? (
                        <>
                            <Spinner />
                            <h1 className="email-confirmed--box__heading">
                                Adding user...
                            </h1>
                            <p className="email-confirmed--box__text">
                                Please wait while we add your user information.
                            </p>
                        </>
                    ) : addUserSuccess === true ? (
                        <>
                            <FaCircleCheck className="email-confirmed--box__icon" />
                            <h1 className="email-confirmed--box__heading">
                                User added
                            </h1>
                            <p className="email-confirmed--box__text">
                                User has been added successfully. Redirecting...
                            </p>
                        </>
                    ) : addUserSuccess === false ? (
                        <>
                            <FaCircleExclamation className="email-confirmed--box__icon email-confirmed--box__icon--expired" />
                            <h1 className="email-confirmed--box__heading">
                                Error adding user
                            </h1>
                            <p className="email-confirmed--box__text">
                                There was an error adding the user. Please try again.
                            </p>
                            <button
                                className="email-confirmed--box__btn button-hover"
                                onClick={addUserInfoToDatabase}
                            >
                                try again
                            </button>
                        </>
                    ) : (
                        <>
                            <h1 className="email-confirmed--box__heading">
                                Initializing...
                            </h1>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Rollback