import React, { useState } from 'react';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';
import Input from '../common/Input';
import Loader from '../common/Loader';

const LoginPortal = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState('user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log('Attempting login with:', { email, password, selectedRole });
      const result = await login(email, password, selectedRole);
      console.log('Login result:', result);
      if (!result.success) {
        setError(result.error || 'Login failed');
      }
    } catch (err) {
      console.error('Login catch error:', err);
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
          <p className="text-sm sm:text-base text-gray-600">Login to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {/* Email Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(null);
                }}
                disabled={loading}
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(null);
                }}
                disabled={loading}
                required
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login as
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
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-secondary-orange focus:ring-secondary-orange flex-shrink-0"
                    aria-label="User role"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base text-gray-900">User</div>
                    <div className="text-xs sm:text-sm text-gray-600">Regular user access</div>
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
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5 text-secondary-orange focus:ring-secondary-orange flex-shrink-0"
                    aria-label="Admin role"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base text-gray-900">Admin</div>
                    <div className="text-xs sm:text-sm text-gray-600">Admin access</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md" role="alert">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            {/* Test Credentials Info */}
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-xs sm:text-sm text-blue-800">
                <strong>Test Credentials:</strong><br/>
                User: prachi.garg@example.com / password123<br/>
                Admin: admin@example.com / admin123
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !email || !password}
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

