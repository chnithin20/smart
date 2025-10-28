import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Eye, EyeOff, Car, Home } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { validateEmail, validatePhone, validateRequired, validateMinLength, validatePassword } from '../utils/validation';

const Register = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Validate name
    const nameValidation = validateRequired(formData.name, 'Full Name');
    if (!nameValidation.valid) {
      newErrors.name = nameValidation.message;
    } else {
      const minLengthValidation = validateMinLength(formData.name, 2, 'Full Name');
      if (!minLengthValidation.valid) {
        newErrors.name = minLengthValidation.message;
      }
    }

    // Validate email
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Validate phone
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number (10-13 digits)';
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.valid) {
      newErrors.password = passwordValidation.message;
    }

    // Validate confirm password
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    // Validate terms
    if (!formData.terms) {
      newErrors.terms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if user already exists
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const existingUser = registeredUsers.find(user => user.email === formData.email);

    if (existingUser) {
      setErrors({ ...errors, email: 'User with this email already exists. Please login instead.' });
      return;
    }

    // Simulate registration - store user data
    const newUser = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      address: '',
      city: '',
      vehicleNumber: '',
      vehicleType: 'car'
    };

    registeredUsers.push(newUser);
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));

    // Auto-login after registration
    login(newUser);
    navigate('/dashboard');
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
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <Car size={32} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Create Account</h1>
          <p className="text-gray-400">Join us and start parking smarter</p>
        </div>

        {/* Register Form */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.name ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="John Doe"
                  required
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.email ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="you@example.com"
                  required
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.phone ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="+91 9876543210"
                  required
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 text-white pl-11 pr-12 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.password ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
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
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full bg-gray-700 text-white pl-11 pr-4 py-3 rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword ? 'focus:ring-red-500 border-red-500' : 'focus:ring-blue-500'
                  }`}
                  placeholder="••••••••"
                  required
                />
                {errors.confirmPassword && (
                  <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </div>

            {/* Terms */}
            <div className="flex items-start">
              <input
                type="checkbox"
                name="terms"
                checked={formData.terms}
                onChange={handleChange}
                className={`w-4 h-4 mt-1 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 ${
                  errors.terms ? 'border-red-500' : ''
                }`}
                required
              />
              <label className="ml-2 text-sm text-gray-300">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-400 hover:text-blue-300 transition-colors duration-200">
                  Privacy Policy
                </Link>
              </label>
            </div>
            {errors.terms && (
              <p className="text-red-400 text-sm mt-1">{errors.terms}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all transform hover:scale-[1.02]"
            >
              Create Account
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-6 text-center text-sm text-gray-400">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-400 hover:text-blue-300 font-semibold transition-colors duration-200">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
