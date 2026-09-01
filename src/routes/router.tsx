import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import LoginPage from '@/features/auth/pages/LoginPage';
import RegisterPage from '@/features/auth/pages/RegisterPage';
import ForgotPasswordPage from '@/features/auth/pages/ForgotPasswordPage';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import UpdatePasswordPage from '@/features/auth/pages/UpdatePasswordPage';
import RootLayout from './RootLayout';
import AppLayout from './applayout';
// import HomePage from "@/features/home/pages/HomePage";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Navigate to="/login" replace />,
      },

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
                path: '/dashboard',
                element: <DashboardPage />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
