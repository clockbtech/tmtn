import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  BarChart3,
  MapPin,
  Package,
  Calendar,
  Users,
  FileText,
  HelpCircle,
  Settings,
  Menu,
  X,
  Home,
  LogOut,
  Moon,
  Sun,
  UserCheck,
  MessageSquare
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const sidebarItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3, path: '/super-admin' },
  { id: 'destinations', label: 'Destinations', icon: MapPin, path: '/super-admin/destinations' },
  { id: 'experiences', label: 'Experiences', icon: Package, path: '/super-admin/experiences' },
  { id: 'bookings', label: 'Bookings', icon: Calendar, path: '/super-admin/bookings' },
  { id: 'users', label: 'Users', icon: Users, path: '/super-admin/users' },
  { id: 'tour-guides', label: 'Tour Guides', icon: UserCheck, path: '/super-admin/tour-guides' },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare, path: '/super-admin/testimonials' },
  { id: 'blogs', label: 'Blogs', icon: FileText, path: '/super-admin/blogs' },
  { id: 'faqs', label: 'FAQs', icon: HelpCircle, path: '/super-admin/faqs' },
  { id: 'settings', label: 'Settings', icon: Settings, path: '/super-admin/settings' },
];

interface SuperAdminLayoutProps {
  children: React.ReactNode;
}

export const SuperAdminLayout: React.FC<SuperAdminLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const currentPath = location.pathname;

  const handleNavigation = (path: string) => {
    navigate(path);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/');
  };

  return (
    <div className={cn("min-h-screen bg-background", darkMode && "dark")}>
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-50 h-screen w-64 transform bg-card border-r transition-transform duration-200 ease-in-out",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Sidebar header */}
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <h2 className="text-lg font-semibold text-foreground">Super Admin</h2>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Sidebar footer */}
          <div className="p-4 border-t space-y-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDarkMode(!darkMode)}
              className="w-full justify-start"
            >
              {darkMode ? <Sun className="h-4 w-4 mr-2" /> : <Moon className="h-4 w-4 mr-2" />}
              {darkMode ? 'Light Mode' : 'Dark Mode'}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="w-full justify-start"
            >
              <Home className="h-4 w-4 mr-2" />
              Back to Website
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="w-full justify-start text-destructive hover:text-destructive"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="md:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold text-foreground">
              {sidebarItems.find(item => item.path === currentPath)?.label || 'Super Admin'}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Admin Panel
            </Button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
};
