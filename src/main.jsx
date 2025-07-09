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
import FavouriteProvider from './providers/FavouriteProvider.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ToastProvider>
        <DialogProvider>
          <AuthProvider>
            <FavouriteProvider>
              <UserProvider>
                <RouterProvider router={ Routes } basename="./"/>
              </UserProvider>
            </FavouriteProvider>
          </AuthProvider>
        </DialogProvider>
      </ToastProvider>
    </ThemeProvider>
  </StrictMode>,
)
