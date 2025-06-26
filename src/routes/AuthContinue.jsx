import { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useUserProvider } from '../providers/UserProvider'
import { useNavigate } from 'react-router-dom'
import { useDialogProvider } from '../providers/DialogProvider'
import RouteLoader from '../components/RouteLoader'
import '../styles/AuthContinue.css'

function AuthContinue() {
    // Get the current authentication session
    const { session } = useAuth()

    // React Router function for programmatic navigation
    const navigateTo = useNavigate()

    // Get the dialog provider to show dialogs
    const { showDialog } = useDialogProvider()

    // Get user-related functions from the provider
    const { getUserFromSupabase, addNewUser, setCurrentLoggedInUser } = useUserProvider()

    // State to track if the user has finished social signup
    // 'loading' means the check is in progress
    const [ hasUserFinishedSocialSignup, setHasUserFinishedSocialSignup ] = useState( 'loading' );


    // Adds a new user if they haven't finished social signup
    async function addUserIfHaventFinishedSocialSignup() {
        // Try to add a new user with the email from the session
        const { success: addUserSuccess, error: addUserError } =  await addNewUser({
            email: session.user.email
        })

        if ( addUserSuccess ) {
            // If successful, navigate to the home page
            navigateTo('/')
        } else {
            console.log('add user error', addUserError)
            // If there's an error, show a dialog with the error message
            showDialog({
                title: "Error inserting user info",
                content: <div className='auth-continue--dialog__content'>
                    <p className='auth-continue--dialog__text'>
                        there was an error update your user information, please try again. Error: { addUserError.message }
                    </p>
                </div>
            })
        }
    }

    // Checks if the user has already finished social signup
    async function checkIfUserHasFinishedSocialSignup() {
        // Fetch user data from Supabase using the session user id
        const { data, error } = await getUserFromSupabase( session.user.id )

        if ( error ) {
            console.log(error)
            // If there's an error, show a dialog with the error message
            showDialog({
                title: "Error fetching user info",
                content: <div className='auth-continue--dialog__content'>
                    <p className='auth-continue--dialog__text'>
                        there was an error update your user information, please try again. Error: { error.message }
                    </p>
                </div>
            })
        } else {
            // If user data exists, set state to true, else false
            if ( data.length != 0 ) {
                setCurrentLoggedInUser({
                    email: data[0].email,
                    profile_photo_url: data[0].profile_photo_url
                })
                setHasUserFinishedSocialSignup( true )
            } else {
                setHasUserFinishedSocialSignup( false )
            }
        }
    }

    // Effect to check if the user has finished social signup when session changes
    useEffect( function() {
        if ( session != 'loading' && session ) {
            checkIfUserHasFinishedSocialSignup()
        }
    }, [ session ])

    // Effect to add user or navigate based on signup status
    useEffect( function() {
        if ( hasUserFinishedSocialSignup == false ) {
            addUserIfHaventFinishedSocialSignup()
        }
    }, [ hasUserFinishedSocialSignup ])

    // Show a loading indicator while checking user info
    return (
        <RouteLoader text={'checking user info'}/>
    )
}

export default AuthContinue
