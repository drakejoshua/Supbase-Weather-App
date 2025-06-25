import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './Routes.jsx'
import ThemeProvider from './providers/ThemeProvider.jsx'
import DialogProvider from './providers/DialogProvider.jsx'
import './index.css'
import ToastProvider from './providers/ToastProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <DialogProvider>
          <RouterProvider router={ Routes }/>
        </DialogProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
