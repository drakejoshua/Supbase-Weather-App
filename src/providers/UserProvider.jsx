import { createContext, useContext, useState } from 'react'
import supabase from './SupabaseProvider'

const UserContext = createContext()

export function useUserProvider() {
    return useContext( UserContext )
}

function UserProvider({ children }) {
  const [ currentLoggedInUser, setCurrentLoggedInUser ] = useState(null)

  async function addNewUser( userData ) {
    const { data: { data }, error } = await supabase.from('Users')
        .insert( userData )
        .select()

    if ( error ) {
        return { error: error, success: false, data: null }
    }

    setCurrentLoggedInUser({
        email: data[0].email,
        profile_photo_url: data[0].profile_photo_url
    })
    return { error: null, success: true, data: data }
  }

  async function updateUser( newUserData, user_id ) {
    const { data: { data }, error } = await supabase.from('Users')
        .update( newUserData )
        .eq('user_id', user_id)
        .select()

    if ( error ) {
        return { error: error, success: false, data: null }
    }

    setCurrentLoggedInUser({
        email: data[0].email,
        profile_photo_url: data[0].profile_photo_url
    })
    return { error: null, success: true, data: data }
  }

  async function getUserFromSupabase( user_id ) {
    const { data, error } = await supabase.from('Users')
        .select('*')
        .eq('user_id', user_id )

    if ( error  ) {
        return { success: false, error: error, data: null }
    }

    return { success: true, error: null, data: data }
  }

  return (
    <UserContext.Provider value={ { 
        addNewUser, 
        updateUser, 
        currentLoggedInUser, 
        setCurrentLoggedInUser, 
        getUserFromSupabase } }
    >
      { children }
    </UserContext.Provider>
  )
}

export default UserProvider
