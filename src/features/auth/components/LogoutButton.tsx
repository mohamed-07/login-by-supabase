import { Button } from '@/components/ui/button';
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton() {
  const signOut = useAuthStore((state) => state.signOut);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate('/login');
  };
  return (
    <Button
      className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
      variant="outline"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
}
