import { FaArrowLeft, FaMoon } from 'react-icons/fa6'
import { useThemeProvider } from '../providers/ThemeProvider'

function Topbar() {
  const { theme, toggleTheme } = useThemeProvider()

  return (
    <div className="topbar">
        <FaArrowLeft className='topbar__return-icon'/>

        <button className="topbar__theme-toggle" onClick={ toggleTheme }>
            <FaMoon className="topbar__theme-toggle-icon"/>
            {/* <FaRegSun className="topbar__theme-toggle-icon"/> */}
        </button>
    </div>
  )
}

export default Topbar
