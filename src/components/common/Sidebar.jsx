import React, { useState, useEffect } from 'react';
import useAuth from '../../hooks/useAuth';
import useTheme from '../../hooks/useTheme';
import RoleBadge from '../auth/RoleBadge';
import Icon from './Icon';
import { MENU_ITEMS } from '../../utils/menuConfig';

const Sidebar = ({ isOpen, onClose, activeItem, onMenuClick }) => {
  const { role, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const [activeItemLocal, setActiveItemLocal] = useState('Dashboard');
  const currentActive = activeItem !== undefined ? activeItem : activeItemLocal;
  
  const menuItems = MENU_ITEMS[role] || MENU_ITEMS.user;

  const handleLogout = async () => {
    await logout();
    window.location.reload();
  };

  const handleMenuClick = (label) => {
    setActiveItemLocal(label);
    if (onMenuClick) {
      onMenuClick(label);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (window.innerWidth < 1024 && onClose) {
      onClose();
    }
  };

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

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      <aside 
        id="sidebar"
        className={`
          fixed left-0 top-0 h-screen w-64 text-white flex flex-col z-50
          transform transition-transform duration-300 ease-in-out
          ${isDarkMode ? 'bg-gray-800 border-r border-gray-700' : 'bg-primary-red'}
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0
        `}
        aria-label="Navigation sidebar"
        role="navigation"
      >
        <div className={`p-4 lg:p-6 border-b flex items-center justify-between ${
          isDarkMode ? 'border-gray-700' : 'border-primary-red-dark'
        }`}>
          <h1 className="text-xl lg:text-2xl font-bold" id="sidebar-title">Events Management</h1>
          <button
            onClick={onClose}
            className={`lg:hidden rounded p-2 transition-colors ${
              isDarkMode 
                ? 'hover:bg-gray-700 text-gray-200' 
                : 'hover:bg-primary-red-dark text-white'
            }`}
            aria-label="Close sidebar menu"
            title="Close menu (Esc)"
          >
            <Icon name="close" className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-2 lg:p-4 overflow-y-auto" aria-label="Main navigation menu">
          <ul className="space-y-1 lg:space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleMenuClick(item.id)}
                  className={`
                    w-full flex items-center space-x-2 lg:space-x-3 px-3 lg:px-4 py-2 lg:py-3 rounded-lg
                    transition-colors duration-200 text-sm lg:text-base
                    ${currentActive === item.id
                      ? isDarkMode
                        ? 'bg-primary-red text-white font-medium'
                        : 'bg-secondary-orange-light text-secondary-orange-dark font-medium'
                      : isDarkMode
                      ? 'text-gray-100 hover:bg-gray-700'
                      : 'text-white hover:bg-primary-red-dark'
                    }
                  `}
                  aria-label={`${item.label} menu item`}
                  aria-current={currentActive === item.id ? 'page' : undefined}
                  title={item.label}
                >
                  <Icon name={item.icon} className="w-5 h-5 lg:w-6 lg:h-6" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className={`p-3 lg:p-4 border-t space-y-3 lg:space-y-4 ${
          isDarkMode ? 'border-gray-700' : 'border-primary-red-dark'
        }`}>
          <div>
            {role && <RoleBadge role={role} />}
          </div>
          <button
            onClick={handleLogout}
            className={`w-full px-3 lg:px-4 py-2 rounded-lg font-medium transition-colors text-sm lg:text-base ${
              isDarkMode
                ? 'bg-primary-red text-white hover:bg-primary-red-dark'
                : 'bg-secondary-orange-light text-secondary-orange-dark hover:bg-opacity-90'
            }`}
            aria-label="Logout from application"
            title="Click to logout"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

