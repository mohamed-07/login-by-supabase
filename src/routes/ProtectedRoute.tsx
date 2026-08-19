import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/features/auth/store/authStore';
import { Spinner } from '@/components/ui/spinner';


export function ProtectedRoute() {
  const { user, loading } = useAuthStore();
  // console.log("ProtectedRoute user:", user);

  if (loading) return <Spinner className='size-8 poeition' />;
  if (!user) return <Navigate to="/login" replace />;
  return <Outlet />;
}
