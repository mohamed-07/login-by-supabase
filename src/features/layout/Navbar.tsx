import { Menu } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

import LogoutButton from '@/features/auth/components/LogoutButton';
import { useAuthStore } from '../auth/store/authStore';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Movies', href: '/movies' },
  { name: 'TV Shows', href: '/tv-shows' },
  { name: 'My List', href: '/my-list' },
];

export default function Navbar() {
  const { user } = useAuthStore();
  return (
    <nav className="flex h-16 items-center gap-4 border-b px-4 md:px-6">
      {/* Logo */}
      <div className="shrink-0 text-xl font-bold">Logo</div>

      {/* Desktop navigation */}
      <div className="hidden items-center gap-6 md:flex">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className="text-sm font-medium hover:text-primary hover:cursor-pointer"
          >  
            {item.name}
          </a>
        ))}
      </div>
      {/* Search - visible on mobile AND desktop */}
      <div className="ml-auto w-full max-w-[220px] sm:max-w-xs">
        <Input type="search" placeholder="Search..." />
      </div>

      {/* Desktop Avatar */}
      <Avatar className="hidden md:flex">
        <AvatarImage src="/avatar.jpg" alt="User" />
        <AvatarFallback>MR</AvatarFallback>
      </Avatar>  

      {/* Mobile Burger */}
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          }
        ></SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
          </SheetHeader>

          <div className="mt-6 flex flex-col gap-5 items-center justify-start  mx-6">
            {/* Navigation */}
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-base font-medium"
              >
                {item.name}
              </a>
            ))}

            {/* User */}
            <div className="flex items-center gap-3 border-t pt-5">
              <Avatar>
                <AvatarImage src="/avatar.jpg" alt="User" />
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>

              <div className=''>
                <p className="font-medium">{user?.user_metadata.first_name}</p>
                <p className="text-sm text-muted-foreground">
                  {user?.user_metadata.email}
                </p>
              </div>
            </div>

            {/* Logout */}
            <div className="flex items-center gap-2 border-t pt-5">
              <LogoutButton />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
}
