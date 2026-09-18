import { createBrowserRouter, } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';
import { HomePage } from '@/features/home/pages/HomePage';
import UpdatePasswordPage from '@/features/auth/pages/UpdatePasswordPage';
import MouvisePage from '@/features/mouvise/page/MovisePage';
import RootLayout from './RootLayout';
import AppLayout from './AppLayout';
import MovieDetailsPage from '@/features/mouvise/page/MovieDetailsPage';
// import HomePage from "@/features/home/pages/HomePage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      // {
      //   path: '/',
      //   element: <Navigate to="/login" replace />,
      // },

      // Public routes
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/forgot-password',
        element: <ForgotPasswordPage />,
      },
      {
        path: '/update-password',
        element: <UpdatePasswordPage />,
      },

      // Protected application
      {
        element: <ProtectedRoute />,
        children: [
          {
            element: <AppLayout />,
            children: [
              {
                path: '/',
                element: <HomePage />,
              },
              {
                path: '/home',
                element: <HomePage />,
              },
              {
                path: '/movies',
                element: <MouvisePage />,
              },
              {
                path: '/tv-shows',
                element: <MovieDetailsPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
