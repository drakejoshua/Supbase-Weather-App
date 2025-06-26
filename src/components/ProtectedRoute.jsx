import { useEffect } from "react"
import { useAuth } from "../providers/AuthProvider"
import RouteLoader from "./RouteLoader"
import { useNavigate } from "react-router-dom"

function ProtectedRoute({ children }) {
  const { session } = useAuth()
  const navigateTo = useNavigate()

  useEffect( function() {
    if ( session != "loading" && session == null ) {
        navigateTo('/signin') 
    }
  }, [ session ])

  if ( session == 'loading' ) {
    return (
        <RouteLoader text="checking if user logged in..."/>
    )
  }

  if ( session != 'loading' && session != null ) {
    return <> { children } </>
  }
}

export default ProtectedRoute
