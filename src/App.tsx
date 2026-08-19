import './App.css';
import { router } from './routes/router';
import { RouterProvider } from 'react-router-dom';
import { useAuthStore } from './features/auth/store/authStore';
import { useEffect } from 'react';

function App() {
  const initAuth = useAuthStore((state) => state.initAuth);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
