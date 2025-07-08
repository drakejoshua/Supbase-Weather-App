import '../styles/Favourites.css'
import Topbar from '../components/Topbar'
import Spinner from '../components/Spinner'
import { FaClipboardQuestion, FaHeart, FaLinkSlash, FaLocationDot, FaRegHeart, FaRotateRight, FaTrash, FaTriangleExclamation } from 'react-icons/fa6'
import { useDialogProvider } from '../providers/DialogProvider'
import RouteLoader from '../components/RouteLoader'
import RouteError from '../components/RouteError'
import { useEffect, useState } from 'react'
import { useAuth } from '../providers/AuthProvider'
import { useFavouriteProvider } from '../providers/FavouriteProvider'
import { useToastProvider } from '../providers/ToastProvider'

function Favourites() {
  const { showDialog, hideDialog } = useDialogProvider()
  const { showToast } = useToastProvider()
  const { session } = useAuth()
  const { favourites, getFavourites, removeFavourite } = useFavouriteProvider()

  const [ isRouteLoading, setIsRouteLoading ] = useState( true )
  const [ routeError, setRouteError ] = useState( null )

  function promptReomveFavourite( favourite_id ) {
    showDialog({
      title: 'confirm this action',
      content: <div className="favourites--remove-dialog__content">
        <p className="favourites--remove-dialog__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, itaque.
        </p>

        <button className="favourites--remove-dialog__button" onClick={ () => removeFromFavourite( favourite_id ) }>
          remove from favourites
        </button>
      </div>
    })
  }

  async function fetchUserFavourites() {
    try {
      const { success, error } = await getFavourites()

      if ( !success ) {
        setRouteError( error )
      }
    } catch( err ) {
      setRouteError( err )
    } finally {
      setIsRouteLoading( false )
    }
  }

  async function removeFromFavourite( favourite_id ) {
    try {
      hideDialog()
      const { success, error } = await removeFavourite( favourite_id )

      if ( success ) {
        showToast({
          title: "Removed From Favourites"
        })
      } else {
        showDialog({
          title: "Error removing favourite",
          content: <div className="favourites--remove-dialog__text">
            Sorry, there was an error deleting this favourite. Please try again later. <br />
            Error: { error.message }
          </div>
        })
      }
    } catch( err ) {
      showDialog({
        title: "Error performing action",
        content: <div className="favourites--remove-dialog__text">
          Sorry, there was an error performing this action. Please try again later. <br />
          Error: { err.message }
        </div>
      })
    }
  }

  useEffect( function() {
    if ( session != 'loading' && session ) {
      fetchUserFavourites()
    }
  }, [ session ])

  return (
    <div className='route'>
      { routeError && <RouteError text={`error loading favourites. Error: ${ routeError.message }`} handleRetry={() => { window.location.reload()}}/>}

      { isRouteLoading && <RouteLoader text='loading favourites...'/>}

      <div className="favourites">
        <Topbar/>

        <h1 className="favourites--heading">
          your favourites
        </h1>

        { favourites.length == 0 && <div className="favourites--no-favourites">
          <FaClipboardQuestion className="favourites--no-favourites__icon"/>
          
          <p className="favourites--no-favourites__text">
            you have not added any favourites yet
          </p>
        </div>}

        { favourites.length != 0 && <ul className="favourites--list">
          {
            favourites.map( function( favourite ) {    
              return <li className="favourites--list__favourite" key={ favourite.favourite_id }>
                <div className="favourites--list__favourite-icon-ctn">
                  <FaLocationDot className='favourites--list__favourite-icon'/>
                </div>

                <div className="favourites--list__favourite-info">
                  <span className="favourites--list__favourite-name">
                    { favourite.name }
                  </span>
                  
                  <span className="favourites--list__favourite-location">
                    { favourite.country }
                  </span>
                </div>

                <button className="favourites--list__favourite-toggle-btn button-hover" onClick={ () => promptReomveFavourite( favourite.favourite_id ) }>
                  <FaTrash className='favourites--list__favourite-btn-icon'/>
                </button>
              </li>
            })
          }
        </ul>}
      </div>
    </div>
  )
}

export default Favourites
