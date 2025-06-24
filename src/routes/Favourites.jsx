import '../styles/Favourites.css'
import Topbar from '../components/Topbar'
import Spinner from '../components/Spinner'
import { FaClipboardQuestion, FaHeart, FaLinkSlash, FaLocationDot, FaRegHeart, FaRotateRight, FaTriangleExclamation } from 'react-icons/fa6'
import { useDialogProvider } from '../providers/DialogProvider'
import RouteLoader from '../components/RouteLoader'
import RouteError from '../components/RouteError'

function Favourites() {
  const { showDialog, hideDialog } = useDialogProvider()

  function promptReomveFavourite() {
    showDialog({
      title: 'confirm this action',
      content: <div className="favourites--remove-dialog__content">
        <p className="favourites--remove-dialog__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. At, itaque.
        </p>

        <button className="favourites--remove-dialog__button" onClick={ handleRemoveFavourite }>
          remove from favourites
        </button>
      </div>
    })
  }

  function handleRemoveFavourite() {
    hideDialog()
  }

  return (
    <div className='route'>
      {/* <RouteError text="there was an error" handleRetry={() => {}}/> */}

      {/* <RouteLoader text='loading page...'/> */}

      <div className="favourites">
        <Topbar/>

        <h1 className="favourites--heading">
          your favourites
        </h1>

        <div className="favourites--no-favourites">
          <FaClipboardQuestion className="favourites--no-favourites__icon"/>
          
          <p className="favourites--no-favourites__text">
            you have not added any favourites yet
          </p>
        </div>

        {/* <ul className="favourites--list">
          <li className="favourites--list__favourite">
            <div className="favourites--list__favourite-icon-ctn">
              <FaLocationDot className='favourites--list__favourite-icon'/>
            </div>

            <div className="favourites--list__favourite-info">
              <span className="favourites--list__favourite-name">
                nairobi
              </span>
              
              <span className="favourites--list__favourite-location">
                nairobi, kenya 110106
              </span>
            </div>

            <button className="favourites--list__favourite-toggle-btn button-hover" onClick={ promptReomveFavourite }>
              <FaHeart className='favourites--list__favourite-btn-icon'/>
              <FaRegHeart className='favourites--list__favourite-btn-icon'/>
            </button>
          </li>
          
          <li className="favourites--list__favourite">
            <div className="favourites--list__favourite-icon-ctn">
              <FaLocationDot className='favourites--list__favourite-icon'/>
            </div>

            <div className="favourites--list__favourite-info">
              <span className="favourites--list__favourite-name">
                nairobi
              </span>
              
              <span className="favourites--list__favourite-location">
                nairobi, kenya 110106
              </span>
            </div>

            <button className="favourites--list__favourite-toggle-btn">
              <FaHeart className='favourites--list__favourite-btn-icon'/>
              <FaRegHeart className='favourites--list__favourite-btn-icon'/>
            </button>
          </li>
          
          <li className="favourites--list__favourite">
            <div className="favourites--list__favourite-icon-ctn">
              <FaLocationDot className='favourites--list__favourite-icon'/>
            </div>

            <div className="favourites--list__favourite-info">
              <span className="favourites--list__favourite-name">
                nairobi
              </span>
              
              <span className="favourites--list__favourite-location">
                nairobi, kenya 110106
              </span>
            </div>

            <button className="favourites--list__favourite-toggle-btn">
              <FaHeart className='favourites--list__favourite-btn-icon'/>
              <FaRegHeart className='favourites--list__favourite-btn-icon'/>
            </button>
          </li>
        </ul> */}
      </div>
    </div>
  )
}

export default Favourites
