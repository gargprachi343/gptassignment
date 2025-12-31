import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import RoleBadge from '../auth/RoleBadge';

/**
 * Sidebar navigation component (similar to FoodMeal design)
 */
const Sidebar = ({ isOpen, onClose }) => {
  const { role, logout } = useAuth();
  const [activeItem, setActiveItem] = useState('Dashboard');

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const handleMenuClick = (label) => {
    setActiveItem(label);
    // Scroll to top when switching views
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && window.innerWidth < 1024) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && !sidebar.contains(e.target) && !e.target.closest('[data-menu-toggle]')) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen, onClose]);

  const menuItems = [
    { icon: '📌', label: 'Dashboard', id: 'Dashboard' },
    { icon: '📅', label: 'Events', id: 'Events' },
    { icon: '⭐', label: 'Favorites', id: 'Favorites' },
    { icon: '💬', label: 'Messages', id: 'Messages' },
    { icon: '🕐', label: 'History', id: 'History' },
    { icon: '📄', label: 'Reports', id: 'Reports' },
    { icon: '⚙️', label: 'Settings', id: 'Settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside 
        id="sidebar"
        className={`
          fixed left-0 top-0 h-screen w-64 bg-primary-red text-white flex flex-col z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        role="complementary"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <div className="p-4 lg:p-6 border-b border-primary-red-dark flex items-center justify-between">
          <h1 className="text-xl lg:text-2xl font-bold">Events Management</h1>
          <button
            onClick={onClose}
            className="lg:hidden text-white hover:bg-primary-red-dark rounded p-2"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 p-2 lg:p-4 overflow-y-auto" aria-label="Main navigation">
          <ul className="space-y-1 lg:space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg
                    transition-colors duration-200 text-sm lg:text-base
                    ${activeItem === item.id
                      ? 'bg-secondary-orange-light text-secondary-orange-dark font-medium'
                      : 'text-white hover:bg-primary-red-dark'
                    }
                  `}
                  aria-label={item.label}
                  aria-current={activeItem === item.id ? 'page' : undefined}
                >
                  <span className="text-lg lg:text-xl">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* User Info & Logout */}
        <div className="p-3 lg:p-4 border-t border-primary-red-dark">
          <div className="mb-3 lg:mb-4">
            {role && <RoleBadge role={role} />}
          </div>
          <button
            onClick={handleLogout}
            className="w-full px-3 lg:px-4 py-2 bg-secondary-orange-light text-secondary-orange-dark rounded-lg font-medium hover:bg-opacity-90 transition-colors text-sm lg:text-base"
            aria-label="Logout"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

