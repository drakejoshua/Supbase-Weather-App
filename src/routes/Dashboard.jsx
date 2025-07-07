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
import { useEffect, useState } from 'react'
import { useUserProvider } from '../providers/UserProvider'
import useSupabaseUpload from '../hooks/useSupabaseUpload'
import supabase from '../providers/SupabaseProvider'
import Dropzone from 'react-dropzone'
import useDebounce from '../hooks/useDebounce'


function Dashboard() {
  const { getUserFromSupabase, currentLoggedInUser, updateUser } = useUserProvider()
  const { session } = useAuth()


  const [ password, setPassword ] = useState("")
  const [ email, setEmail ] = useState("")
  
  
  
  
  const [ searchTerm, setSearchTerm ] = useState("")
  const debouncedSearchTerm = useDebounce( searchTerm )
  const [ isSearchLoading, setIsSearchLoading ] = useState( true )
  const [ searchError, setSearchError ] = useState( null )
  const [ searchData, setSearchData ] = useState( [] )
  const [ dropdownItemClicked, setDropdownItemClicked ] = useState( false )
  const [ searchCollapsibleOpen, setSearchCollapsibleOpen ] = useState( false )


  function setProfilePhotoLoaded() {
    setIsProfilePhotoError( false )
    setIsProfilePhotoLoading( false )
    setIsProfilePhotoLoaded( true )
  }
  function setProfilePhotoLoading() {
    setIsProfilePhotoError( false )
    setIsProfilePhotoLoading( true )
    setIsProfilePhotoLoaded( false )
  }
  function setProfilePhotoError() {
    setIsProfilePhotoError( true )
    setIsProfilePhotoLoading( false )
    setIsProfilePhotoLoaded( false )
  }
  const [ isProfilePhotoLoading, setIsProfilePhotoLoading ] = useState(true)
  const [ isProfilePhotoError, setIsProfilePhotoError ] = useState(false)
  const [ isProfilePhotoLoaded, setIsProfilePhotoLoaded ] = useState(false)


  
  const [ selectedFile, setSelectedFile ] = useState(null);
  const [ passwordDialogOpen, setPasswordDialogOpen ] = useState( false )
  const [ emailDialogOpen, setEmailDialogOpen ] = useState( false )
  const [ profilePhotoDialogOpen, setProfilePhotoDialogOpen ] = useState( false )


  const [ isPasswordUpdating, setIsPasswordUpdating ] = useState( false )
  const [ isEmailUpdating, setIsEmailUpdating ] = useState( false )
  const [ isProfilePhotoUpdating, setIsProfilePhotoUpdating ] = useState( false )

  // route-level state
  const [ isRouteLoading, setIsRouteLoading ] = useState( true )
  const [ routeError, setRouteError ] = useState(null)


  // component-level state
  const [ isGeolocationGranted, setIsGeolocationGranted ] = useState( false )
  const [ weatherData, setWeatherData ] = useState(null)
  const [ weatherForecastData, setWeatherForecastData ] = useState(null)
  const [ weatherError, setWeatherError ] = useState( null )
  const [ isWeatherDataLoading, setIsWeatherDataLoading ] = useState( false )


  // theme state/context
  const { theme, toggleTheme } = useThemeProvider()

  const uploadFile = useSupabaseUpload( supabase )

  const { updateUserAuthData } = useAuth()

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

    try {
      setIsPasswordUpdating( true )

      const { success, error } = await updateUserAuthData({
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
    } catch( err ) {
      showDialog({
        title: 'error updating password',
        content: <p className="dashboard--dialog__text">
          There was a problem updating your password. 
          Please try again. <br />
          Error: { err.message }
        </p>
      })
    } finally {
      setIsPasswordUpdating( false )
    }
  }

  async function handleUpdateEmail(e) {
    e.preventDefault()

    try {
      setIsEmailUpdating( true )

      const { success, error } = await updateUserAuthData({
        email: email
      })

      if ( success ) {
        const { success: userUpdateSuccess, error: userUpdateError } = await updateUser({
          email: email
        })

        if ( userUpdateSuccess ) {
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
              Error: { userUpdateError.message }
            </p>
          })
        }
      } else {
        showDialog({
          title: 'error updating email',
          content: <p className="dashboard--dialog__text">
            There was a problem updating your email. Please try again.<br />
            Error: { error.message }
          </p>
        })
      }
    } catch( err ) {
      showDialog({
        title: 'error updating email',
        content: <p className="dashboard--dialog__text">
          There was a problem updating your email. Please try again.<br />
          Error: { err.message }
        </p>
      })
    } finally {
      setIsEmailUpdating( false )
    }
  }

  async function handleUpdateProfilePhoto() {
    try {
      setIsProfilePhotoUpdating( true )

      if ( selectedFile ) {
        const fileExtension =  selectedFile.name.split(".")[selectedFile.name.split(".").length - 1] 
  
        const { success, error, publicUrl } = await uploadFile('avatars', `${session.user.id}.${fileExtension}`, selectedFile );
        console.log('upload success: ', success )
        console.log('upload error: ', error )
        console.log('upload public-url: ', publicUrl )
  
        if ( success ) {
          const { success: userUpdateSuccess, error: userUpdateError } = await updateUser({
            profile_photo_url: publicUrl
          }, session.user.id )
          console.log('update success: ', userUpdateSuccess )
          console.log('update error: ', userUpdateError )
  
          if ( userUpdateSuccess ) {
            showToast({
              title: 'profile photo updated successfully'
            })
  
            setSelectedFile(null)
            setProfilePhotoDialogOpen( false )
          } else {
            showDialog({
              title: 'error updating profile photo',
              content: <p className="dashboard--dialog__text">
                There was a problem updating your profile photo. Please try again.<br />
                Error: { userUpdateError.message }
              </p>
            })
          }
        } else {
          showDialog({
            title: 'error updating profile photo',
            content: <p className="dashboard--dialog__text">
              There was a problem updating your profile photo. Please try again.<br />
              Error: { error.message }
            </p>
          })
        }
      }
    } catch( err ) {
      showDialog({
        title: 'error updating profile photo',
        content: <p className="dashboard--dialog__text">
          There was a problem updating your profile photo. Please try again.<br />
          Error: { err.message }
        </p>
      })
    } finally {
      setIsProfilePhotoUpdating( false )
    }
  }

  function showUpdatePasswordDialog() {
    setPasswordDialogOpen( true )
  }
  
  function showUpdateEmailDialog() {
    setEmailDialogOpen( true )
  }
  
  function showUpdateProfilePhotoDialog() {
    setProfilePhotoDialogOpen( true )
  }

  async function fetchUserData() {
    try {
      setIsRouteLoading( true )
      
      const { success, error } = await getUserFromSupabase( session.user.id )

      if ( success ) {
        checkGeolocationPermission()
      } else {
        setRouteError( error )
      }
    } catch( err ) {
      setRouteError( err )
    } finally {
      setIsRouteLoading( false )
    }
  }

  async function checkGeolocationPermission() {
    if ( !navigator.permissions ) {
      setIsGeolocationGranted( false )
    }

    try {
      const status = await navigator.permissions.query({ name: 'geolocation'})

      if ( status.state == 'granted' ) {
        setIsGeolocationGranted( true )
      } else {
        setIsGeolocationGranted( false )
      }
    } catch ( err ) {
      console.log('check error ', err)
    }
  }

  async function getGeolocation() {
    return new Promise( function( resolve, reject ) {
      if ( !navigator.geolocation ) {
        reject( new Error("geolocation is not supported"))
      }

      navigator.geolocation.getCurrentPosition(
        function({coords}) {
          resolve({
            lat: coords.latitude,
            long: coords.longitude
          })
        },
        function( error ) {
          reject( error )
        },
        {
          enableHighAccuracy: true,
          timeout: 5000
        }
      )
    })
  }

  async function getCurrentWeather() {
    await checkGeolocationPermission()

    if ( isGeolocationGranted ) {
      try {
        setIsWeatherDataLoading( true )
        setWeatherError( null )
        setWeatherData( null )
        const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY
  
        const { lat, long } = await getGeolocation()

        if ( lat && long ) {
          const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${ lat }&lon=${ long }&appid=${ weatherAPIKey }&units=metric`, {
            cache: 'no-store'
          })
          const forecastResp = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${ lat }&lon=${ long }&appid=${ weatherAPIKey }&units=metric`, {
            cache: 'no-store'
          })
          
          if ( resp.ok && forecastResp.ok ) {
            const json = await resp.json()
            const forecastRespJson = await forecastResp.json()

            setWeatherData( json )
            setWeatherForecastData( forecastRespJson )
          } else {
            setWeatherError( resp.statusText || forecastResp.statusText )
          }
        }
      } catch( err ) {
        setWeatherError( err )
      } finally {
        setIsWeatherDataLoading( false )
      }
    }
  }

  async function promptGeolocationPermission() {
    try {
      await getGeolocation();
      await checkGeolocationPermission()
    } catch ( err ) {
      setIsGeolocationGranted( false )
    }
  }

  async function searchLocations() {
    setSearchCollapsibleOpen( true )
    
    try {
      const weatherAPIKey = import.meta.env.VITE_WEATHER_API_KEY

      if ( debouncedSearchTerm ) {
        setIsSearchLoading( true )
        setSearchError( null )
        setSearchData( [] )

        const resp = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${ debouncedSearchTerm }&appid=${ weatherAPIKey }&limit=10`, {
          cache: 'no-store'
        })

        if ( resp.ok ) {
            const json = await resp.json()

            setSearchData( json )
        } else {
          setSearchError( resp.statusText )
        }
      }
    } catch( err ) {
      setSearchError( err.message )
    } finally {
      setIsSearchLoading( false )
    }
  }

  async function handleSearchInputBlur() {
    if ( !dropdownItemClicked ) {
      setSearchCollapsibleOpen( false )
    }
  }

  useEffect( function() {
    searchLocations()
  }, [ debouncedSearchTerm ])

  useEffect( function() {
    if ( session != 'loading' && session ) {
      fetchUserData()
    }
  }, [session])

  useEffect( function() {
    getCurrentWeather()
  }, [ isGeolocationGranted ])

  useEffect( function() {
    if ( currentLoggedInUser.profile_photo_url ) {
      const profilePhotoImage = new Image();
      profilePhotoImage.src = `${currentLoggedInUser.profile_photo_url}`;
      profilePhotoImage.onload = setProfilePhotoLoaded
      profilePhotoImage.onloadstart = setProfilePhotoLoading
      profilePhotoImage.onerror = setProfilePhotoError
    }
  }, [ currentLoggedInUser.profile_photo_url ])

  return (
    // dashboard route container
    <div className="route">
      { isRouteLoading && <RouteLoader text="loading dashboard.."/>}

      { routeError && <RouteError text={`error loading dashboard: ${ routeError.message }`} handleRetry={ () => window.location.reload() }/>}

      { ( !isRouteLoading && !routeError ) && <div className="dashboard">
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
              { theme == 'dark' && <FaRegSun className='dashboard--navbar__theme-toggle-icon'/>}
              { theme == 'light' && <FaMoon className='dashboard--navbar__theme-toggle-icon'/>}
            </button>

            {/* navbar avatar & dropdown */}
            <DropdownMenu.Root className="dashboard--navbar__dropdown">
              <DropdownMenu.Trigger className="dashboard--navbar__dropdown-trigger">

                {/* navbar avatar */}
                <Avatar.Root className="dashboard--navbar__avatar">
                  { isProfilePhotoLoaded && <Avatar.Image 
                    src={ currentLoggedInUser.profile_photo_url }
                    className="dashboard--navbar__avatar-image"
                  /> }

                  { isProfilePhotoLoading && <Spinner className="dashboard--navbar__avatar-loader-icon"/>}

                  { isProfilePhotoError && <FaTriangleExclamation className="dashboard--navbar__avatar-error-icon"/>}

                  { isProfilePhotoLoaded && <Avatar.Fallback delayMs={1500} className="dashboard--navbar__avatar-fallback">
                    JB
                  </Avatar.Fallback>}
                </Avatar.Root>
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>

                {/* navbar dropdown content */}
                <DropdownMenu.Content className="dashboard--navbar__dropdown-content" sideOffset={8} align='end' side='bottom'>
                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item" onClick={ navigateToFavourites }>
                    favourite locations
                  </DropdownMenu.Item>

                  <DropdownMenu.Item className="dashboard--navbar__dropdown-item" onClick={ showUpdateProfilePhotoDialog }>
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
          <div className="dashboard--searchbar__search">
            <FaMagnifyingGlass className='dashboard--searchbar__search-icon'/>

            <input 
              type="text" 
              className="dashboard--searchbar__search-input" 
              onBlur={handleSearchInputBlur}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='search city, zip code, state...'
            />

            {/* <FaXmark className='dashboard--searchbar__search-icon'/> */}
          </div>

          <Collapsible.Root open={ searchCollapsibleOpen }>
            <div className="dashboard--searchbar__search-dropdown-ctn">
              <Collapsible.Content className='dashboard--searchbar__search-dropdown'>
                {/* loading */}
                { isSearchLoading && <div className="dashboard--searchbar__search-dropdown-loader">
                  <Spinner className='dashboard--searchbar__search-dropdown-load-icon'/>

                  loading locations
                </div>}
                
                {/* error */}
                { searchError && <div className="dashboard--searchbar__search-dropdown-error">
                  <FaTriangleExclamation className='dashboard--searchbar__search-dropdown-error-icon'/>

                  error loading locations: { searchError }
                </div>}

                {/* not-found */}
                { ( debouncedSearchTerm != "" && searchData.length == 0 ) && <div className="dashboard--searchbar__search-dropdown-not-found">
                  <FaListCheck className='dashboard--searchbar__search-dropdown-not-found-icon'/>

                  no locations matching "{ debouncedSearchTerm }" was found
                </div>}

                {/* found / search-results */}
                { ( debouncedSearchTerm != "" && searchData.length > 0 ) && <ul className="dashboard--searchbar__search-dropdown-result-list">
                  { searchData.map( function( location, index ) {
                      return <li className="dashboard--searchbar__search-dropdown-result" key={ index } 
                              onMouseDown={ () => setDropdownItemClicked( true )}
                              onClick={ () => navigateTo(`/view?lat=${ location.lat }&lon=${ location.lon }`) }>
                                <FaLocationDot className='dashboard--searchbar__search-result-icon'/>

                                <div className="dashboard--searchbar__search-result-group">
                                  <span className="dashboard--searchbar__search-result-city">
                                    { location.name }
                                  </span>
                                  
                                  <span className="dashboard--searchbar__search-result-info">
                                    { location.state }, { location.country }
                                  </span>
                                </div>
                          </li>
                    } )
                  }
                </ul>}
              </Collapsible.Content>
            </div>
          </Collapsible.Root>
        </div>

        {/* dashboard location summary */}
        <div className="dashboard--summary">

          {/* summary data */}
          { (isGeolocationGranted && weatherData) && <SummaryData
            iconCode={ weatherData.weather[0].icon }
            location={ weatherData.name }
            temperature={ weatherData.main.temp }
            description={ weatherData.weather[0].description }
          />}

          {/* loading */}
          { (isGeolocationGranted && isWeatherDataLoading) && <SubLoader text='loading weather data for your location'/>}
          
          {/* error */}
          { (isGeolocationGranted && weatherError) && <SubError text={`error loading location data: ${ weatherError.message }`} handleRetry={ getCurrentWeather }/>}

          {/* permission not-granted */}
          { !isGeolocationGranted && <SubPermNotGrant text="you have not granted location access" handleRequest={ promptGeolocationPermission }/>}
        </div>

        {/* dashboard sub-heading */}
        <h2 className='dashboard--subheading'>
          weather forcast
        </h2>

        {/* dashboard weather forecast */}
        <div className="dashboard--forecast">
          {/* forecast data */}
          { (isGeolocationGranted && weatherData) && <ForecastData data={ weatherForecastData?.list }/> }

          {/* loading */}
          { (isGeolocationGranted && isWeatherDataLoading) && <SubLoader text='loading weather data for your location'/> }

          {/* error */}
          { (isGeolocationGranted && weatherError) && <SubError  text={`error loading location data: ${ weatherError.message }`} handleRetry={ getCurrentWeather }/> }

          {/* permission not-granted */}
          { !isGeolocationGranted && <SubPermNotGrant text="you have not granted location access" handleRequest={ promptGeolocationPermission }/> }
        </div>
      </div>}

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

            <Form.Submit className='dashboard--dialog__form-submit-btn button-hover button-hover-white' disabled={ isPasswordUpdating }>
              { !isPasswordUpdating && <>update password</>}
              { isPasswordUpdating && <> <Spinner/> loading.. </>}
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

            <Form.Submit className='dashboard--dialog__form-submit-btn button-hover button-hover-white' disabled={ isEmailUpdating }>
              { !isEmailUpdating && <>update email</>}
              { isEmailUpdating && <> <Spinner/> loading.. </>}
            </Form.Submit>
          </Form.Root>
        </div>
      </DialogComponent>

      {/* update profile photo dialog */}
      <DialogComponent 
        title="update profile photo?"
        open={ profilePhotoDialogOpen }
        handleOpenChange={ setProfilePhotoDialogOpen }
      >
        <div className="dashboard--dialog__content">
          <p className="dashboard--dialog__text">
            Choose a new profile photo to represent you. 
            Make sure it's clear and appropriate. 
            Your photo helps personalize your account.
          </p>

          { !selectedFile && <Dropzone 
            onDrop={function( acceptedFiles ) {
              setSelectedFile( acceptedFiles[0] )
            }} 
            accept={{'image/*':[]}} 
            maxSize={2 * 1024 * 1024} 
            multiple={false}
          >
            {
              function({ getInputProps, getRootProps, isDragActive, isDragReject }) {
                return <div 
                          className="dashboard--dialog__dropzone" 
                          {...getRootProps()}
                          data-drag-active={ isDragActive }
                          data-drag-reject={ isDragReject }
                        >
                          <input {...getInputProps()}/>

                          <FaUpload className='dashboard--dialog__dropzone-icon'/>

                          <span className="dashboard--dialog__dropzone-text">
                            { !isDragReject && <>Drag & drop an image here, or click to select a file.( Max: 2MB )</>}
                            { isDragReject && <>unsupported file, drag an image file, or click to select a file( Max: 2MB )</>}
                          </span>
                        </div>
              }
            }
          </Dropzone> }

          { selectedFile && <div className="dashboard--dialog__photo-preview">
            <img src={ URL.createObjectURL( selectedFile ) } alt="" className="dashboard--dialog__preview-image" />
          </div>}

          <button className="dashboard--dialog__upload-btn button-hover-white" onClick={ handleUpdateProfilePhoto }  disabled={ isProfilePhotoUpdating }>
            { !isProfilePhotoUpdating && <>upload photo</>}
            { isProfilePhotoUpdating && <> <Spinner/> loading.. </>}
          </button>
        </div>
      </DialogComponent>
    </div>
  )
}

export default Dashboard
