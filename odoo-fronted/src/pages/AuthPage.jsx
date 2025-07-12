import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Mail, Lock, User, Recycle, Leaf, Award, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
 const [isLogin, setIsLogin] = useState(true);
 const navigate = useNavigate();
const [showPassword, setShowPassword] = useState(false);
const [formData, setFormData] = useState({
  name: '',
  email: '',
  password: ''
});
const [loading, setLoading] = useState(false);
const [message, setMessage] = useState('');
const [floatingElements, setFloatingElements] = useState([]);

useEffect(() => {
  const elements = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2
  }));
  setFloatingElements(elements);
}, []);

const handleInputChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage('');

  // Validation
  if (!formData.email || !formData.password) {
    setMessage('Please fill in all required fields');
    setLoading(false);
    return;
  }

  if (!isLogin && !formData.name) {
    setMessage('Please enter your full name');
    setLoading(false);
    return;
  }

  if (formData.password.length < 6) {
    setMessage('Password must be at least 6 characters long');
    setLoading(false);
    return;
  }

  try {
    const endpoint = isLogin 
      ? 'http://localhost:5000/api/auth/login' 
      : 'http://localhost:5000/api/auth/register';
    
    const payload = isLogin 
      ? { email: formData.email, password: formData.password }
      : formData;

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Something went wrong');
    }

    // Successful response
    if (isLogin) {
      // Store the token (in localStorage for this example)
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
      setMessage('Login successful! Redirecting...');
        navigate(`${data.user.isAdmin ? `/admin/${data.user.id}` : `/user/${data.user.id}`}`, { replace: true });
      // Redirect or update app state here
    } else {
      setMessage('Registration successful! You can now log in.');
      setTimeout(() => setIsLogin(true), 2000);
    }
  } catch (error) {
    setMessage(error.message || 'An error occurred during authentication');
    console.error('Auth error:', error);
  } finally {
    setLoading(false);
  }
};

const toggleMode = () => {
  setIsLogin(!isLogin);
  setFormData({ name: '', email: '', password: '' });
  setMessage('');
};
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Floating Background Elements */}
      {floatingElements.map((element) => (
        <div
          key={element.id}
          className="absolute opacity-10 animate-bounce"
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            animationDuration: '3s'
          }}
        >
          {element.id % 3 === 0 && <Recycle className="w-8 h-8 text-green-400" />}
          {element.id % 3 === 1 && <Leaf className="w-6 h-6 text-green-500" />}
          {element.id % 3 === 2 && <Award className="w-7 h-7 text-gray-400" />}
        </div>
      ))}

      {/* Main Container */}
      <div className="w-full max-w-md relative">
        {/* 3D Card Container */}
        <div className="relative transform-gpu transition-all duration-700 ">
          {/* Card Shadow */}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl transform rotate-3 scale-105 opacity-20"></div>
          
          {/* Main Card */}
          <div className="relative bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-200/50 overflow-hidden">
            {/* Header Section */}
            <div className="relative p-8 pb-6">
              {/* Brand Logo */}
              <div className="flex items-center justify-center mb-6">
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-lg transform rotate-12 hover:rotate-0 transition-transform duration-300">
                    <Recycle className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-md animate-pulse">
                    <Award className="w-3 h-3 text-yellow-800" />
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">ReWear</h1>
                <p className="text-gray-600 text-sm">Sustainable Fashion, Gamified Experience</p>
              </div>

              {/* Mode Toggle */}
              <div className="flex bg-gray-100 rounded-full p-1 mb-6">
                <button
                  onClick={() => setIsLogin(true)}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                    isLogin 
                      ? 'bg-white text-gray-800 shadow-md transform scale-105' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Login
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-all duration-300 ${
                    !isLogin 
                      ? 'bg-white text-gray-800 shadow-md transform scale-105' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Register
                </button>
              </div>
            </div>

            {/* Form Section */}
            <div className="px-8 pb-8">
              <div className="space-y-6">
                {/* Name Field - Only for Register */}
                {!isLogin && (
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Full Name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
                    />
                  </div>
                )}

                {/* Email Field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
                  />
                </div>

                {/* Password Field */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 bg-white/80 backdrop-blur-sm hover:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-lg font-medium hover:from-green-600 hover:to-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-300 transform  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center group"
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {isLogin ? 'Sign In' : 'Create Account'}
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </div>

              {/* Message Display */}
              {message && (
                <div className={`mt-4 p-3 rounded-lg flex items-center ${
                  message.includes('success') || message.includes('registered') 
                    ? 'bg-green-50 text-green-800 border border-green-200' 
                    : 'bg-red-50 text-red-800 border border-red-200'
                }`}>
                  {message.includes('success') || message.includes('registered') ? (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  ) : (
                    <div className="w-4 h-4 mr-2 rounded-full bg-red-200"></div>
                  )}
                  <span className="text-sm">{message}</span>
                </div>
              )}

              {/* Toggle Link */}
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={toggleMode}
                  className="text-sm text-gray-600 hover:text-green-600 transition-colors duration-300"
                >
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <span className="font-medium underline decoration-green-400">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Accent */}
            <div className="h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>
          </div>
        </div>

        {/* Floating Stats */}
        <div className="absolute -top-6 -right-6 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg border border-gray-200/50 animate-pulse">
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">1000+</div>
            <div className="text-xs text-gray-500">Items Reworn</div>
          </div>
        </div>

        <div className="absolute -bottom-6 -left-6 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg border border-gray-200/50 animate-pulse delay-150">
          <div className="text-center">
            <div className="text-sm font-bold text-green-600">500+</div>
            <div className="text-xs text-gray-500">Eco Warriors</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;