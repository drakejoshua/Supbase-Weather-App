import { FaCircleQuestion, FaCircleXmark, FaClipboardQuestion, FaCloudSunRain, FaListCheck, FaLocationDot, FaLocationPin, FaMagnifyingGlass, FaMoon, FaRegSun, FaRotateRight, FaTriangleExclamation, FaUpload, FaX, FaXmark } from 'react-icons/fa6'
import { Avatar, DropdownMenu, Collapsible, Form } from 'radix-ui'
import '../styles/Dashboard.css'
import { useThemeProvider } from '../providers/ThemeProvider'
import { useDialogProvider, DialogComponent } from '../providers/DialogProvider'
import { useToastProvider } from '../providers/ToastProvider'
import { useAuth } from '../providers/AuthProvider'
import Spinner from '../components/Spinner'
import SummaryData from '../components/SummaryData'
import SubLoader from '../components/SubLoader'
import SubError from '../components/SubError'
import SubPermNotGrant from '../components/SubPermNotGrant'
import ForecastData from '../components/ForecastData'
import RouteLoader from '../components/RouteLoader'
import RouteError from '../components/RouteError'
import { useNavigate }  from 'react-router-dom'
import { useState } from 'react'
import sample_img_1 from '../assets/sample_img_1'


function Dashboard() {

  const [ password, setPassword ] = useState("")
  const [ email, setEmail ] = useState("")

  const [ passwordDialogOpen, setPasswordDialogOpen ] = useState( false )
  const [ emailDialogOpen, setEmailDialogOpen ] = useState( false )
  const [ profilePhotoDialogOpen, setProfilePhotoDialogOpen ] = useState( true )

  // theme state/context
  const { theme, toggleTheme } = useThemeProvider()

  const { updateUser } = useAuth()

  const navigateTo = useNavigate()

  const { signOut } = useAuth()

  const { showDialog } = useDialogProvider()
  
  const { showToast } = useToastProvider()
  
  async function handleSignOut() {
    const { success, error } = await signOut()

    if ( success ) {
      showToast({
        title: `sign out successful`
      })

      navigateTo('/signin')
    } else {
      showDialog({
        title: `error signing you out`,
        content: <p className="dashboard--dialog__text">
            there was an error signing you out, please try again.
            Error: { error.message }
          </p>
      })
    }
  }

  function navigateToFavourites() {
    navigateTo('/favourites')
  }

  async function handleUpdatePassword(e) {
    e.preventDefault()

    const { success, error } = await updateUser({
      password: password
    })

    if ( success ) {
      setPasswordDialogOpen( false )
      showToast({
        title: 'Password update successful'
      })
    } else {
      showDialog({
        title: 'error updating password',
        content: <p className="dashboard--dialog__text">
          There was a problem updating your password. 
          Please try again. <br />
          Error: { error.message }
        </p>
      })
    }
  }

  async function handleUpdateEmail(e) {
    e.preventDefault()

    const { success, error } = await updateUser({
      email: email
    })

    if ( success ) {
      setEmailDialogOpen( false )

      showDialog({
        title: 'new email confirmation sent',
        content: <p className="dashboard--dialog__text">
          A confirmation link has been sent to your new email address.
          Please confirm your email within 2 minutes to complete the update.
          The link will expire if not used in time.
        </p>
      })
    } else {
      showDialog({
        title: 'error updating email',
        content: <p className="dashboard--dialog__text">
          There was a problem updating your email. Please try again.<br />
          Error: { error.message }
        </p>
      })
    }
  }

  function showUpdatePasswordDialog() {
    setPasswordDialogOpen( true )
  }
  
  function showUpdateEmailDialog() {
    setEmailDialogOpen( true )
  }

  return (
    // dashboard route container
    <div className="route">
      {/* <RouteLoader text="loading dashboard.."/> */}

      {/* <RouteError text="error loading dashboard"/> */}

      <div className="dashboard">
        {/* dashboard navbar */}
        <nav className="dashboard--navbar">
          {/* navbar logo */}
          <span className="dashboard--navbar__logo">
            <FaCloudSunRain className='dashboard--navbar__logo-icon'/>

            InstaWeather
          </span>

          {/* navbar buttons & links */}
          <div className="dashboard--navbar__buttons">
            {/* theme toggle button */}
            <button className="dashboard--navbar__theme-toggle-btn" onClick={ toggleTheme }>
              <FaRegSun className='dashboard--navbar__theme-toggle-icon'/>
              {/* <FaMoon className='dashboard--navbar__theme-toggle-icon'/> */}
            </button>

            {/* navbar avatar & dropdown */}
            <DropdownMenu.Root className="dashboard--navbar__dropdown">
              <DropdownMenu.Trigger className="dashboard--navbar__dropdown-trigger">

                {/* navbar avatar */}
                <Avatar.Root className="dashboard--navbar__avatar">
                  <Avatar.Image 
                    src='https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541'
                    className="dashboard--navbar__avatar-image"
                  />

                  {/* <Spinner className="dashboard--navbar__avatar-loader-icon"/> */}

                  {/* <FaTriangleExclamation className="dashboard--navbar__avatar-error-icon"/> */}

                  {/* <Avatar.Fallback delayMs={1500} className="dashboard--navbar__avatar-fallback">
                    JB
                  </Avatar.Fallback> */}
                </Avatar.Root>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>

                {/* navbar dropdown content */}
                <DropdownMenu.Content className="dashboard--navbar__dropdown-content" sideOffset={8} align='end' side='bottom'>
                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item" onClick={ navigateToFavourites }>
                    favourite locations
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item" onClick={ null }>
                    update profile photo
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item" onClick={ showUpdateEmailDialog }>
                    update email
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item" onClick={ showUpdatePasswordDialog }>
                    update password
                  </DropdownMenu.Item>

                  <DropdownMenu.Separator className="dashboard--navbar__dropdown-separator"/>

                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item dashboard--navbar__dropdown-item--danger"
                    onClick={handleSignOut}>
                    sign out
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Portal>
            </DropdownMenu.Root>
          </div>
        </nav>

        {/* dashboard searchbar */}
        <div className="dashboard--searchbar">
          <Collapsible.Root>
            <Collapsible.Trigger asChild>
              <div className="dashboard--searchbar__search">
                <FaMagnifyingGlass className='dashboard--searchbar__search-icon'/>

                <input type="text" id="" className="dashboard--searchbar__search-input" />

                {/* <FaXmark className='dashboard--searchbar__search-icon'/> */}
              </div>
            </Collapsible.Trigger>

            <div className="dashboard--searchbar__search-dropdown-ctn">
              <Collapsible.Content className='dashboard--searchbar__search-dropdown'>
                {/* loading */}
                {/* <div className="dashboard--searchbar__search-dropdown-loader">
                  <Spinner className='dashboard--searchbar__search-dropdown-load-icon'/>

                  loading locations
                </div> */}
                
                {/* error */}
                {/* <div className="dashboard--searchbar__search-dropdown-error">
                  <FaTriangleExclamation className='dashboard--searchbar__search-dropdown-error-icon'/>

                  error loading locations
                </div> */}

                {/* not-found */}
                {/* <div className="dashboard--searchbar__search-dropdown-not-found">
                  <FaListCheck className='dashboard--searchbar__search-dropdown-not-found-icon'/>

                  no locations matching "la" was found
                </div> */}

                {/* found / search-results */}
                <ul className="dashboard--searchbar__search-dropdown-result-list">
                  <li className="dashboard--searchbar__search-dropdown-result">
                      <FaLocationDot className='dashboard--searchbar__search-result-icon'/>

                      <div className="dashboard--searchbar__search-result-group">
                        <span className="dashboard--searchbar__search-result-city">
                          nairobi
                        </span>
                        
                        <span className="dashboard--searchbar__search-result-info">
                          nairobi, kenya
                        </span>
                      </div>
                  </li>

                  <li className="dashboard--searchbar__search-dropdown-result">
                    <FaLocationDot className='dashboard--searchbar__search-result-icon'/>

                    <div className="dashboard--searchbar__search-result-group">
                      <span className="dashboard--searchbar__search-result-city">
                        nairobi
                      </span>
                      
                      <span className="dashboard--searchbar__search-result-info">
                        nairobi, kenya
                      </span>
                    </div>
                  </li>
                  
                  <li className="dashboard--searchbar__search-dropdown-result">
                    <FaLocationDot className='dashboard--searchbar__search-result-icon'/>

                    <div className="dashboard--searchbar__search-result-group">
                      <span className="dashboard--searchbar__search-result-city">
                        nairobi
                      </span>
                      
                      <span className="dashboard--searchbar__search-result-info">
                        nairobi, kenya
                      </span>
                    </div>
                  </li>
                </ul>
              </Collapsible.Content>
            </div>
          </Collapsible.Root>
        </div>

        {/* dashboard location summary */}
        <div className="dashboard--summary">

          {/* summary data */}
          <SummaryData
            location="lagos"
            temperature="27*C"
            description='partly cloudy'
          />

          {/* loading */}
          {/* <SubLoader text='loading weather data for your location'/> */}
          
          {/* error */}
          {/* <SubError text='error loading location data'/> */}

          {/* permission not-granted */}
          {/* <SubPermNotGrant text="you have not granted location access"/> */}
        </div>

        {/* dashboard sub-heading */}
        <h2 className='dashboard--subheading'>
          weather forcast
        </h2>

        {/* dashboard weather forecast */}
        <div className="dashboard--forecast">
          {/* forecast data */}
          <ForecastData/>

          {/* loading */}
          {/* <SubLoader text='loading weather data for your location'/> */}

          {/* error */}
          {/* <SubError text='error loading location data'/> */}

          {/* permission not-granted */}
          {/* <SubPermNotGrant text="you have not granted location access"/> */}
        </div>
      </div>

      {/* update password dialog */}
      <DialogComponent 
        title={'update password?'} 
        open={ passwordDialogOpen}
        handleOpenChange={ setPasswordDialogOpen }
      >
        <div className="dashboard--dialog__content">
          <p className="dashboard--dialog__text">
            Enter your new password below. 
            Make sure it's strong and something you'll remember. 
          </p>

          <Form.Root className='dashboard--dialog__form' onSubmit={ handleUpdatePassword }>
            <Form.Field className='dashboard--dialog__form-field'>
              <Form.Label className='dashboard--dialog__form-label'>
                new password
              </Form.Label>

              <Form.Control asChild>
                <input 
                  type="text" 
                  className='dashboard--dialog__form-input'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required 
                />
              </Form.Control>

              <Form.Message match="valueMissing" className='dashboard--dialog__form-message'>
                <FaTriangleExclamation className='dashboard--dialog__form-message-icon'/> you need to provide a password
              </Form.Message>
            </Form.Field>

            <Form.Submit className='dashboard--dialog__form-submit-btn button-hover button-hover-white'>
              update password
            </Form.Submit>
          </Form.Root>
        </div>
      </DialogComponent>

      {/* update email dialog */}
      <DialogComponent 
        title={'update email?'}
        open={ emailDialogOpen }
        handleOpenChange={ setEmailDialogOpen }
      >
        <div className="dashboard--dialog__content">
          <p className="dashboard--dialog__text">
            Enter your new email below. 
            Make sure it's not the old one and something you'll remember. 
          </p>

          <Form.Root className='dashboard--dialog__form' onSubmit={ handleUpdateEmail }>
            <Form.Field className='dashboard--dialog__form-field'>
              <Form.Label className='dashboard--dialog__form-label'>
                new email
              </Form.Label>

              <Form.Control asChild>
                <input 
                  type="email" 
                  className='dashboard--dialog__form-input'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required 
                />
              </Form.Control>

              <Form.Message  match="valueMissing" className='dashboard--dialog__form-message'>
                <FaTriangleExclamation className='dashboard--dialog__form-message-icon'/>
                you need to provide a email
              </Form.Message>
              
              <Form.Message  match="typeMismatch" className='dashboard--dialog__form-message'>
                <FaTriangleExclamation className='dashboard--dialog__form-message-icon'/>
                please provide a valid email
              </Form.Message>
            </Form.Field>

            <Form.Submit className='dashboard--dialog__form-submit-btn button-hover button-hover-white'>
              update email
            </Form.Submit>
          </Form.Root>
        </div>
      </DialogComponent>
    </div>
  )
}

export default Dashboard
