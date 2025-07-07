import { FaArrowLeft, FaMoon, FaRegSun } from 'react-icons/fa6'
import { useThemeProvider } from '../providers/ThemeProvider'
import { useNavigate } from 'react-router-dom'

function Topbar() {
  const { theme, toggleTheme } = useThemeProvider()

  const navigateTo =  useNavigate()

  return (
    <div className="topbar">
        <FaArrowLeft className='topbar__return-icon' onClick={ () => navigateTo(-1)}/>

        <button className="topbar__theme-toggle" onClick={ toggleTheme }>
            { theme == 'light' && <FaMoon className="topbar__theme-toggle-icon"/>}
            { theme == 'dark' && <FaRegSun className="topbar__theme-toggle-icon"/>}
        </button>
    </div>
  )
}

export default Topbar
