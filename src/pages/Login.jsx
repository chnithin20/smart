import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Car, Eye, EyeOff, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validateRequired } from '../utils/validation';

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState('');

  // Redirect based on role if already logged in
  useEffect(() => {
    if (user) {
      const redirectPath = user.role === 'admin' ? '/admin' : '/dashboard';
      navigate(redirectPath);
    }
  }, [user, navigate]);

  const validateForm = () => {
    const newErrors = {};

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate password
    const passwordValidation = validateRequired(formData.password, 'Password');
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    // Check if user is registered
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const registeredUser = registeredUsers.find(user => user.email === formData.email);

    if (!registeredUser) {
      setError('User not found. Please register first.');
      return;
    }

    // Use registered user data for login
    login(registeredUser);
    // Navigate based on role (determined by email)
    const role = formData.email.toLowerCase().includes('admin') ? 'admin' : 'user';
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-gray-950 to-purple-900/20"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-900/20 via-transparent to-transparent"></div>

      {/* Back to Home Button */}
      <button
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-cyan-500 group"
      >
        <Home size={18} className="group-hover:text-cyan-400 transition-colors" />
        <span className="text-sm font-medium">Back to Home</span>
      </button>

      <div className="max-w-md w-full relative z-10">
        
        {/* Logo and Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-600/20 border-2 border-cyan-500/50 rounded-full mb-4 shadow-xl shadow-cyan-900/50">
            <Car size={40} className="text-cyan-400" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Smart Parking
          </h1>
          <p className="text-cyan-400 font-medium">Sign in to your account</p>
        </div>

        {/* Login Form Card */}
        <div className="bg-gray-900/80 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-gray-800">
          
          {error && (
            <div className="mb-6 bg-red-900/20 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-800 text-white pl-11 pr-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-cyan-500 focus:border-cyan-500'
                  }`}
                  placeholder="you@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-800 text-white pl-11 pr-12 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
                    errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-700 focus:ring-cyan-500 focus:border-cyan-500'
                  }`}
                  placeholder="••••••••"
                  required
                />
                {errors.password && (
                  <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                )}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 text-cyan-600 bg-gray-800 border-gray-700 rounded focus:ring-cyan-500"
                />
                <span className="ml-2 text-sm text-gray-400">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors duration-200">
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 rounded-lg font-semibold hover:from-cyan-700 hover:to-blue-700 transition-all shadow-lg shadow-cyan-900/50 transform hover:scale-[1.02]"
            >
              Sign In
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-gray-900 text-gray-500">Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-white text-sm">Google</span>
            </button>
            <button className="flex items-center justify-center px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 transition-all duration-200 transform hover:scale-105">
              <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-white text-sm">Facebook</span>
            </button>
          </div>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{' '}
            <Link to="/register" className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors duration-200">
              Sign up
            </Link>
          </p>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-blue-900/20 border border-blue-700 rounded-lg p-4">
          <p className="text-sm text-blue-300 font-semibold mb-2">Demo Credentials:</p>
          <p className="text-xs text-blue-200">User: demo@smartparking.com</p>
          <p className="text-xs text-blue-200">Admin: admin@smartparking.com</p>
          <p className="text-xs text-blue-200">Password: any password</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
