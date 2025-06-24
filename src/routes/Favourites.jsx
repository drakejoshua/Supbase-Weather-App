import '../styles/Favourites.css'
import Topbar from '../components/Topbar'
import { FaHeart, FaLocationDot, FaRegHeart } from 'react-icons/fa6'
import { useDialogProvider } from '../providers/DialogProvider'

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
      <div className="favourites">
        <Topbar/>

        <h1 className="favourites--heading">
          your favourites
        </h1>

        <ul className="favourites--list">
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
              {/* <FaRegHeart className='favourites--list__favourite-btn-icon'/> */}
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
              {/* <FaRegHeart className='favourites--list__favourite-btn-icon'/> */}
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
              {/* <FaRegHeart className='favourites--list__favourite-btn-icon'/> */}
            </button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Favourites
