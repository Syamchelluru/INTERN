'use client';

import { useAuth } from '@/components/providers';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  MapPin,
  Layout,
  Settings,
  History,
  Users,
  Smartphone,
  LogOut,
  Shield,
  User,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const userMenuItems = [
    { icon: Layout, label: 'Dashboard', href: '/dashboard' },
    { icon: Settings, label: 'Settings', href: '/settings' },
    { icon: History, label: 'Device History', href: '/history' },
  ];

  const adminMenuItems = [
    { icon: Layout, label: 'Dashboard', href: '/dashboard' },
    { icon: Smartphone, label: 'Device Management', href: '/admin/devices' },
    { icon: Users, label: 'User Management', href: '/admin/users' },
    { icon: Settings, label: 'Settings', href: '/admin/settings' },
  ];

  const menuItems = user?.role === 'admin' ? adminMenuItems : userMenuItems;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const SidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo & Title */}
      <div className="flex items-center gap-3 mb-8">
        <MapPin className="h-8 w-8 text-cyan-400" />
        <div>
          <h2 className="text-xl font-bold tracking-wide">Nigha GPS</h2>
          <p className="text-sm text-gray-300">
            {user?.role === 'admin' ? 'Admin Panel' : 'User Dashboard'}
          </p>
        </div>
      </div>

      {/* User Info */}
      <div className="flex items-center gap-3 mb-6 p-3 bg-white/10 rounded-xl">
        {user?.role === 'admin' ? (
          <Shield className="h-5 w-5 text-red-400" />
        ) : (
          <User className="h-5 w-5 text-blue-400" />
        )}
        <div>
          <p className="font-semibold">{user?.name}</p>
          <p className="text-xs text-gray-300">{user?.email}</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start text-left font-medium text-white hover:bg-cyan-500/20 transition-all duration-200",
              pathname === item.href ? "bg-cyan-500/20 text-cyan-300" : ""
            )}
            onClick={() => {
              router.push(item.href);
              setIsMobileOpen(false);
            }}
          >
            <item.icon className="h-5 w-5 mr-3" />
            {item.label}
          </Button>
        ))}
      </nav>

      {/* Logout */}
      <Button
        variant="ghost"
        onClick={handleLogout}
        className="w-full mt-4 text-red-300 hover:bg-red-500/20 transition-all duration-200"
      >
        <LogOut className="h-4 w-4 mr-2" />
        Logout
      </Button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex w-64 h-screen p-5 bg-[#0f111a]/60 backdrop-blur-md border-r border-white/10 shadow-lg text-white",
        className
      )}>
        {SidebarContent}
      </aside>

      {/* Mobile Hamburger */}
      <div className="fixed top-4 right-4 z-50 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsMobileOpen(true)}
          className="text-white bg-[#0f111a]/80 backdrop-blur-md rounded-full"
        >
          <Menu className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile Drawer */}
      <div
        className={cn(
          "fixed top-0 right-0 h-full w-72 p-5 bg-[#0f111a]/90 backdrop-blur-md border-l border-white/10 text-white shadow-lg z-40 transform transition-transform duration-300",
          isMobileOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Menu</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileOpen(false)}
            className="text-white"
          >
            <X className="h-6 w-6" />
          </Button>
        </div>
        {SidebarContent}
      </div>
    </>
  );
}
