import React, { useState } from 'react';
import { 
  Shirt, 
  PackageCheck, 
  Calendar, 
  Search, 
  Menu, 
  X,
  Home,
  Bell,
  User
} from 'lucide-react';

interface NavigationProps {
  active: string;
  setActive: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ active, setActive }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const links = [
    { name: 'Home', icon: <Home size={20} />, id: 'home' },
    { name: 'My Closet', icon: <Shirt size={20} />, id: 'closet' },
    { name: 'Outfits', icon: <PackageCheck size={20} />, id: 'outfits' },
    { name: 'Calendar', icon: <Calendar size={20} />, id: 'calendar' },
    { name: 'Discover', icon: <Search size={20} />, id: 'discover' },
  ];

  const notifications = [
    { id: 1, text: 'New trend alert: Summer styles', time: '2 hours ago' },
    { id: 2, text: 'Reminder: Plan your outfit for tomorrow', time: '5 hours ago' },
    { id: 3, text: 'New style tips available', time: '1 day ago' },
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <nav className="w-full bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 flex items-center">
              <Shirt className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">StyleCloset</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => setActive(link.id)}
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  active === link.id
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </button>
            ))}
            
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 text-gray-600 hover:text-indigo-600 relative"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
              
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
                  </div>
                  {notifications.map(notification => (
                    <div key={notification.id} className="px-4 py-3 hover:bg-gray-50">
                      <p className="text-sm text-gray-800">{notification.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-indigo-600 hover:text-indigo-800">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* User Profile */}
            <button className="p-2 text-gray-600 hover:text-indigo-600">
              <User size={20} />
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="flex items-center md:hidden">
            <button
              className="p-2 rounded-md text-gray-600 hover:text-indigo-600 focus:outline-none"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 animate-fadeIn">
          <div className="pt-2 pb-3 space-y-1">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActive(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center w-full px-4 py-2 text-base font-medium ${
                  active === link.id
                    ? 'text-indigo-600 bg-indigo-50'
                    : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                }`}
              >
                <span className="mr-3">{link.icon}</span>
                {link.name}
              </button>
            ))}
            <div className="px-4 py-2 border-t border-gray-200">
              <button className="flex items-center w-full py-2 text-gray-600">
                <Bell size={20} className="mr-3" />
                Notifications
              </button>
              <button className="flex items-center w-full py-2 text-gray-600">
                <User size={20} className="mr-3" />
                Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;