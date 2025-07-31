
import React from 'react';
import { User, Calendar, Heart, Star, CreditCard, Settings, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface AccountSidebarProps {
  activeSection: string;
  onSectionChange: (section: 'profile' | 'bookings' | 'wishlist' | 'reviews' | 'payment' | 'settings') => void;
}

const menuItems = [
  { id: 'profile', label: 'Profile', icon: User },
  { id: 'bookings', label: 'My Bookings', icon: Calendar },
  { id: 'wishlist', label: 'Wishlist', icon: Heart },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const AccountSidebar = ({ activeSection, onSectionChange }: AccountSidebarProps) => {
  const handleLogout = () => {
    // TODO: Implement logout functionality
    console.log('Logout clicked');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      {/* Profile Summary */}
      <div className="text-center mb-8">
        <Avatar className="w-20 h-20 mx-auto mb-4">
          <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
          <AvatarFallback className="text-lg">JS</AvatarFallback>
        </Avatar>
        <h3 className="font-semibold text-gray-900">Jayvion Simon</h3>
        <p className="text-sm text-gray-500">nannie.abernathy70@yahoo.com</p>
        <p className="text-sm text-gray-500">365-374-4961</p>
      </div>

      {/* Navigation Menu */}
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <Button
              key={item.id}
              variant={isActive ? "default" : "ghost"}
              className={`w-full justify-start ${
                isActive 
                  ? "bg-tmtn-red text-white hover:bg-tmtn-red/90" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => onSectionChange(item.id as any)}
            >
              <Icon className="w-4 h-4 mr-3" />
              {item.label}
            </Button>
          );
        })}
        
        {/* Logout Button */}
        <Button
          variant="ghost"
          className="w-full justify-start text-red-600 hover:bg-red-50 hover:text-red-700 mt-4"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3" />
          Logout
        </Button>
      </nav>
    </div>
  );
};

export { AccountSidebar };

