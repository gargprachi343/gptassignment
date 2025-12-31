import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';
import Loader from '../common/Loader';

/**
 * Login portal component for admin and user role selection
 */
const LoginPortal = () => {
  const { login } = useAuth();
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedRole) {
      setError('Please select a role');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await login(selectedRole);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary-orange-light via-white to-accent-peach p-3 sm:p-4">
      <div className="max-w-md w-full bg-white rounded-xl sm:rounded-2xl shadow-xl p-6 sm:p-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Events Management</h1>
          <p className="text-sm sm:text-base text-gray-600">Select your role to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Choose Your Role
              </label>
              <div className="space-y-2 sm:space-y-3">
                <label
                  className={`
                    flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer
                    transition-all duration-200
                    ${selectedRole === 'user'
                      ? 'border-secondary-orange bg-secondary-orange-light'
                      : 'border-gray-300 hover:border-secondary-orange hover:bg-secondary-orange-light/30'
                    }
                    focus-within:ring-2 focus-within:ring-secondary-orange
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={selectedRole === 'user'}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setError(null);
                    }}
                    className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-secondary-orange focus:ring-secondary-orange flex-shrink-0"
                    aria-label="User role"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base text-gray-900">User</div>
                    <div className="text-xs sm:text-sm text-gray-600">View and filter events</div>
                  </div>
                  <div className="ml-2 sm:ml-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-secondary-orange-light flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </label>
                
                <label
                  className={`
                    flex items-center p-3 sm:p-4 border-2 rounded-lg cursor-pointer
                    transition-all duration-200
                    ${selectedRole === 'admin'
                      ? 'border-secondary-orange bg-secondary-orange-light'
                      : 'border-gray-300 hover:border-secondary-orange hover:bg-secondary-orange-light/30'
                    }
                    focus-within:ring-2 focus-within:ring-secondary-orange
                  `}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={selectedRole === 'admin'}
                    onChange={(e) => {
                      setSelectedRole(e.target.value);
                      setError(null);
                    }}
                    className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-secondary-orange focus:ring-secondary-orange flex-shrink-0"
                    aria-label="Admin role"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base text-gray-900">Admin</div>
                    <div className="text-xs sm:text-sm text-gray-600">Full access - Create, edit, and delete events</div>
                  </div>
                  <div className="ml-2 sm:ml-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary-red-light flex items-center justify-center flex-shrink-0">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 text-primary-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                </label>
              </div>
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md" role="alert">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              disabled={loading || !selectedRole}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader size="sm" className="mr-2" />
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPortal;

