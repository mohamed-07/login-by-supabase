import { Outlet } from 'react-router-dom';
import  Navbar from '@/features/layout/Navbar';
import { Toaster } from '@/components/ui/toast';


export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
        <Navbar/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Toaster />
    </div>
  );
}
