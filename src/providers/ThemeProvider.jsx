import { createContext } from "react"
import useTheme from "../hooks/useTheme";
import { useEffect } from "react";
import { useContext } from "react";


const ThemeContext  = createContext();

function ThemeProvider({ children }) {
  const [ theme, toggleTheme ] = useTheme('insta-weather-theme')

  useEffect( function(){
    if ( theme == 'dark' ) {
        document.documentElement.style.setProperty('--brand-white','#333')
        document.documentElement.style.setProperty('--brand-black','#ffffff')
        document.documentElement.style.setProperty('--brand-pale-white','#5e5e5e')
        document.documentElement.style.setProperty('--brand-white-half-opacity','#333333cf')
        document.documentElement.style.setProperty('--brand-black-half-opacity','#ffffffcf')
        document.documentElement.style.setProperty('--brand-pale-white-half-opacity','#5e5e5ecf')
    } else {
        document.documentElement.style.setProperty('--brand-white','#ffffff')
        document.documentElement.style.setProperty('--brand-black','#333')
        document.documentElement.style.setProperty('--brand-pale-white','#dfdfdf')
        document.documentElement.style.setProperty('--brand-white-half-opacity','#ffffffcf')
        document.documentElement.style.setProperty('--brand-black-half-opacity','#333333cf')
        document.documentElement.style.setProperty('--brand-pale-white-half-opacity','#f0f0f0cf')
    }
  }, [ theme ])

  return (
    <ThemeContext.Provider value={ { theme, toggleTheme } }>
        { children }
    </ThemeContext.Provider>
  )
}


export function useThemeProvider() {
    return useContext( ThemeContext )
}

export default ThemeProvider
