import { createContext, useContext, useState  } from "react"
import { useAuth } from "./AuthProvider"
import supabase from '../providers/SupabaseProvider'

const FavouriteContext = createContext()

export function useFavouriteProvider() {
  return useContext( FavouriteContext )
}

function FavouriteProvider({ children }) {
  const [ favourites, setFavourites ] = useState([])
  const { session } = useAuth()

  async function removeFavourite( favourite_id ) {
    const response = await supabase.from('Favourites')
      .delete()
      .eq('favourite_id', favourite_id )

    if ( response.status == 204 ) {
      setFavourites( function( prev ) {
        return prev.filter( function( favourite ) {
          return favourite.favourite_id != favourite_id
        })
      })

      return { success: true, error: null, data: true }
    } else {
      return { success: false, error: new Error('invalid favourite_id'), data: null }
    }

  }
  
  async function addFavourite( favourite_data ) {
    const { data, error } = await supabase.from('Favourites')
      .insert( favourite_data )
      .select()

    if ( error ) {
      return { success: false, error: error, data: null }
    } else {
      setFavourites( function( prev ) {
        return [ data[0], ...prev ]
      })
      return { success: true, error: null, data: data[0] }
    }
  }

  async function getFavourites() {
    const { data, error } = await supabase.from('Favourites')
        .select()
        .eq('user_id', session.user.id)

    if ( error ) {
        return { success: false, error: error, data: null }
    }

    setFavourites( [ ...data ] )
    return { success: true, error: null, data: data }
  }

  return (
    <FavouriteContext.Provider value={{ favourites, addFavourite, removeFavourite, getFavourites }}>
      { children }
    </FavouriteContext.Provider>
  )
}

export default FavouriteProvider
