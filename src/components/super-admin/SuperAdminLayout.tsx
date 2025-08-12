import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  MapPin, 
  Compass, 
  UserCheck, 
  FileText, 
  MessageSquare, 
  HelpCircle, 
  Settings,
  Video,
  Search,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

const SuperAdminLayout = ({ children }: SuperAdminLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleLogout = () => {
    // Implement your logout logic here
    console.log('Logging out...');
    navigate('/auth'); // Redirect to the login page after logout
  };

  const navItems = [
    { href: '/super-admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/super-admin/users', label: 'Users', icon: Users },
    { href: '/super-admin/bookings', label: 'Bookings', icon: Calendar },
    { href: '/super-admin/destinations', label: 'Destinations', icon: MapPin },
    { href: '/super-admin/experiences', label: 'Experiences', icon: Compass },
    { href: '/super-admin/tour-guides', label: 'Tour Guides', icon: UserCheck },
    { href: '/super-admin/blogs', label: 'Blogs', icon: FileText },
    { href: '/super-admin/testimonials', label: 'Testimonials', icon: MessageSquare },
    { href: '/super-admin/video-reels', label: 'Video Reels', icon: Video },
    { href: '/super-admin/faqs', label: 'FAQs', icon: HelpCircle },
    { href: '/super-admin/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar (visible on larger screens) */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <span className="text-lg font-semibold">Admin Panel</span>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.label} className="mb-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-2 ${location.pathname === item.href ? 'text-blue-600' : 'text-gray-700'}`}
                  onClick={() => navigate(item.href)}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Mobile Sidebar (hidden by default, toggled by button) */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300 ease-in-out md:hidden`}
      >
        <div className="h-16 flex items-center justify-between border-b border-gray-200 p-4">
          <span className="text-lg font-semibold">Admin Panel</span>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            {navItems.map((item) => (
              <li key={item.label} className="mb-2">
                <Button
                  variant="ghost"
                  className={`w-full justify-start gap-2 ${location.pathname === item.href ? 'text-blue-600' : 'text-gray-700'}`}
                  onClick={() => {
                    navigate(item.href);
                    setIsSidebarOpen(false); // Close sidebar after navigation
                  }}
                >
                  <item.icon className="w-4 h-4" />
                  {item.label}
                </Button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </Button>
            <Input type="search" placeholder="Search..." className="max-w-sm md:ml-4" />
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
