import { createContext, useContext, useEffect, useState } from 'react'
import supabase from '../providers/SupabaseProvider';
import { useUserProvider } from './UserProvider';

let AuthContext = createContext();

export function useAuth() {
    return useContext( AuthContext )
}

function AuthProvider({ children }) {
  const [ session, setSession ] = useState('loading')

  const siteURL = import.meta.env.VITE_SITE_URL

  // sign in using email and password
  async function signInUsingEmail( email, password ) {
    const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password
    })

    if ( error ) {
        return { success: false, error: error, data: null }
    }
    
    return { success: true, error: error, data: data }
  }

  // sign up using email and password
  async function signUpUsingEmail( email, password ) {
    const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
            emailRedirectTo: `${ siteURL }/email-confirmed?email=${ email }`
        }
    })

    if ( error ) {
        return { success: false, error: error, data: null }
    }
    
    return { success: true, error: error, data: data }
  }
  
  // sign up using email and password
  async function resendEmail( email, type, redirectURL ) {
    const { error } = await supabase.auth.resend({
        email: email,
        type: type,
        options: {
          emailRedirectTo: redirectURL
        }
    })

    if ( error ) {
        return { success: false, error: error, data: null }
    }
    
    return { success: true, error: error, data: null }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()

    if ( error ) {
        return { success: false, error: error, data: null }
    }
    
    return { success: true, error: error, data: null }
  }

  async function updateUserAuthData( updateData ) {
    const { data, error } = await supabase.auth.updateUser( updateData )

    if ( error ) {
      return { success: false, error: error, data: null }
    }

    return { success: true, error: null, data: data }
  }

  async function signInUsingEmailWithoutPassword( email ) {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
            emailRedirectTo: `${ siteURL }`,
            shouldCreateUser: false
        }
    })

    if ( error ) {
      return { success: false, error: error, data: null }
    }
    
    return { success: true, error: error, data: data }
  }

  async function signInUsingGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${ siteURL }/auth-continue`
        }
    })

    if ( error ) {
        return { success: false, error: error, data: null }
    }
    
    return { success: true, error: null, data: data }
  }
  
  async function signInUsingTwitter() {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'twitter',
        options: {
          redirectTo: `${ siteURL }/auth-continue`
        }
    })

    if ( error ) {
        return { success: false, error: error, data: null }
    }
    
    return { success: true, error: null, data: data }
  }

  useEffect( function() {
    // get the current session on mount if any
    supabase.auth.getSession().then( function( { data: { session } } ) {
        setSession( session )
    })

    // listen for changes in auth state
    supabase.auth.onAuthStateChange( function( event, session ) {
        setSession( session )
    })
  }, [])

  return (
    <AuthContext.Provider value={{ 
        session, 
        signInUsingEmail,
        signInUsingEmailWithoutPassword,
        signInUsingGoogle,
        signInUsingTwitter,
        signUpUsingEmail,
        signOut,
        resendEmail,
        updateUserAuthData
    }}>
        { children }
    </AuthContext.Provider>
  )
}

export default AuthProvider
