import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './Routes.jsx'
import ThemeProvider from './providers/ThemeProvider.jsx'
import DialogProvider from './providers/DialogProvider.jsx'
import './index.css'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <DialogProvider>
        <RouterProvider router={ Routes }/>
      </DialogProvider>
    </ThemeProvider>
  </StrictMode>,
)
