import { createContext, useContext, useEffect, useRef, useState } from 'react'
import { Toast } from 'radix-ui'
import { FaCircleCheck, FaXmark } from 'react-icons/fa6'

let ToastContext = createContext()

export function useToastProvider( content ) {
    return useContext( ToastContext )
}

function ToastProvider({ children }) {
  const [ content, setContent ] = useState({ title: 'my toast'})
  const [ isToastOpen, setIsToastOpen ] =  useState( false );

  const toastProgressBarRef = useRef()

  function showToast( content ) {
    setIsToastOpen( true );
    setContent( content )
  }
  
  function hideToast() {
    setIsToastOpen( false );
    setContent( null )
  }

  return (
    <ToastContext.Provider value={{ showToast, hideToast }}>
      { children }

      <Toast.Provider duration={2900}>
        <Toast.Root open={ isToastOpen } onOpenChange={ setIsToastOpen } className='toast'>
            <div className="toast__content-ctn">
                <Toast.Title className='toast__title'>
                    <FaCircleCheck className='toast__title-icon'/>

                    { content?.title }
                </Toast.Title>

                <Toast.Close className='toast__close-btn'>
                    <FaXmark className='toast__close-icon'/>
                </Toast.Close>
            </div>

            <div className='toast__progress-ctn'>
                <div className="toast__progress-bar" ref={toastProgressBarRef}></div>
            </div>
        </Toast.Root>

        <Toast.Viewport className="toast__viewport"/>
      </Toast.Provider>
    </ToastContext.Provider>
  )
}

export default ToastProvider
