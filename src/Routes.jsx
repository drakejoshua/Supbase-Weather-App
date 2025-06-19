import { createBrowserRouter } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import AuthOnboarding from './routes/Auth-Onboarding'
import Favourites from './routes/Favourites'
import ForgotPassword from './routes/Forgot-Password'
import Signin from './routes/Signin'
import Signup from './routes/Signup'
import View from './routes/View'
import NotFound from './routes/NotFound'



export const Routes = createBrowserRouter([
    {
        path: "/",
        element: <Dashboard />
    },
    {
        path: "/auth-onboarding",
        element: <AuthOnboarding />
    },
    {
        path: "/favourites",
        element: <Favourites />
    },
    {
        path: "/forgot-password",
        element: <ForgotPassword />
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
        element: <View />
    },
    {
        path: "*",
        element: <NotFound />
    }
])