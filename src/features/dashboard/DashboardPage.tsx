// src/features/dashboard/pages/DashboardPage.tsx
import LogoutButton from '@/features/auth/components/LogoutButton';

import { useAuthStore } from '../auth/store/authStore';

export function DashboardPage() {
  const { user } = useAuthStore();
  console.log(user)
  console.log(user?.user_metadata.first_name);

  return (
    <div className="text-center mt-20 space-y-4">
      <p className='text-blue-400'> Welcome back, {user?.user_metadata?.first_name?.toUpperCase()}! </p>
      <p> You are successfully logged in. </p>
      <LogoutButton />
    </div>
  );
}
