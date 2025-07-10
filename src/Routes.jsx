import { createHashRouter } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import Favourites from './routes/Favourites'
import ForgotPassword from './routes/Forgot-Password'
import Signin from './routes/Signin'
import Signup from './routes/Signup'
import View from './routes/View'
import NotFound from './routes/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import AuthContinue from './routes/AuthContinue'
import EmailConfirmed from './routes/EmailConfirmed'
import Rollback from './routes/Rollback'



export const Routes = createHashRouter([
    {
        path: "/",
        element: <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
    },
    {
        path: "/favourites",
        element: <ProtectedRoute>
                    <Favourites />
                </ProtectedRoute>
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
    },
    {
        path: "/auth-continue",
        element: <AuthContinue />
    },
    {
        path: "/email-confirmed",
        element: <EmailConfirmed />
    },
    {
        path: "/rollback",
        element: <Rollback />
    },
    {
        path: "/signin",
        element: <Signin />
    },
    {
        path: "/signup",
        element: <Signup />
    },
    {
        path: "/view",
        element: <ProtectedRoute>
                    <View />
                </ProtectedRoute>
    },
    {
        path: "*",
        element: <NotFound />
    }
])