import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Routes } from './Routes.jsx'
import ThemeProvider from './providers/ThemeProvider.jsx'
import DialogProvider from './providers/DialogProvider.jsx'
import './index.css'
import ToastProvider from './providers/ToastProvider.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import UserProvider from './providers/UserProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <DialogProvider>
          <UserProvider>
            <AuthProvider>
              <RouterProvider router={ Routes }/>
            </AuthProvider>
          </UserProvider>
        </DialogProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
