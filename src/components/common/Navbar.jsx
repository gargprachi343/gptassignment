import React from 'react';
import useAuth from '../../hooks/useAuth';
import RoleBadge from '../auth/RoleBadge';
import Button from './Button';

/**
 * Navbar component with logo, role badge, and logout button
 */
const Navbar = () => {
  const { role, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    // Force page reload to ensure clean state
    window.location.reload();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200" role="banner">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-red to-secondary-orange bg-clip-text text-transparent">
              Events Management
            </h1>
            {role && <RoleBadge role={role} />}
          </div>
          <div className="flex items-center space-x-4">
            <Button
              onClick={handleLogout}
              variant="outline"
              size="sm"
              aria-label="Logout"
            >
              Logout
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

