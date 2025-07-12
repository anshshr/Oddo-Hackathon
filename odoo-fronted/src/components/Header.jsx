import React, { useState, useEffect } from 'react';
import { 
  Search, 
  User, 
  ShoppingBag, 
  Heart, 
  Bell, 
  Settings, 
  LogOut, 
  Plus,
  Menu,
  X,
  ChevronDown,
  Home,
  Package,
  UserCircle,
  Coins
} from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({
    name: "",
    email: "",
    avatar: "",
    isAuthenticated: false,
    coins: 0,
    loading: true
  });

  // Fetch user profile data
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setUser(prev => ({ ...prev, isAuthenticated: false, loading: false }));
          return;
        }

        const userResponse = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
        });
        console.log('User response:', userResponse);

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log('User data:', userData.userDetail);
          setUser({
            name: userData.userDetail.fullName || userData.userDetail.name || "User",
            email: userData.userDetail.email || "",
            avatar: userData.userDetail.profilePhoto || `https://i.pravatar.cc/150?img=21`,
            isAuthenticated: true,
            coins: userData.userDetail.coins || 0,
            loading: false
          });
        } else {
          // Token might be invalid
          localStorage.removeItem('token');
          setUser(prev => ({ ...prev, isAuthenticated: false, loading: false }));
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setUser(prev => ({ ...prev, isAuthenticated: false, loading: false }));
      }
    };

    fetchUserProfile();
  }, []);

  const handleSearch = () => {
    // Handle search logic here
    console.log('Searching for:', searchQuery);
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const toggleProductsDropdown = () => {
    setIsProductsDropdownOpen(!isProductsDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser({
      name: "",
      email: "",
      avatar: "",
      isAuthenticated: false,
      coins: 0,
      loading: false
    });
    // Redirect to login page or refresh
    window.location.href = '/auth';
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ReWear
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="/" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            
            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={toggleProductsDropdown}
                className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
              >
                <Package className="w-4 h-4" />
                <span>Products</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              
              {isProductsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <a 
                    href="/products" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Browse All Products
                  </a>
                  <a 
                    href="/products?category=jacket" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Jackets
                  </a>
                  <a 
                    href="/products?category=dress" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Dresses
                  </a>
                  <a 
                    href="/products?category=shoes" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Shoes
                  </a>
                  <a 
                    href="/products?category=accessories" 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                  >
                    Accessories
                  </a>
                </div>
              )}
            </div>

            <a 
              href="/admin" 
              className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              <Heart className="w-4 h-4" />
              <span>Admin</span>
            </a>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <div className="w-full">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleSearchKeyPress}
                  placeholder="Search for clothing, shoes, accessories..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
            </div>
          </div>

          {/* Right Side - Auth & Profile */}
          <div className="flex items-center space-x-4">
            
            {/* Coins Display (only show if authenticated) */}
            {user.isAuthenticated && (
              <div className="hidden md:flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full">
                <Coins className="w-4 h-4" />
                <span className="font-semibold">{user.coins}</span>
              </div>
            )}

            {/* Add Product Button */}
            <button className="hidden md:flex items-center space-x-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200">
              <Plus className="w-4 h-4" />
              <span>Add Item</span>
            </button>

            {/* Notifications */}
            <button className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </button>

            {/* Profile Dropdown */}
            {user.loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user.isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-gray-200"
                  />
                  <span className="hidden md:block">{user.name.split(' ')[0]}</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-3 border-b border-gray-200">
                      <p className="font-medium text-gray-900">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                      <div className="flex items-center space-x-1 mt-2">
                        <Coins className="w-4 h-4 text-yellow-500" />
                        <span className="text-sm font-semibold text-gray-700">{user.coins} coins</span>
                      </div>
                    </div>
                    
                    <a 
                      href="/user/:userId" 
                      className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600"
                    >
                      <UserCircle className="w-4 h-4" />
                      <span>My Profile</span>
                    </a>
                    
                  
                    
                    <hr className="my-2" />
                    
                    <button 
                      onClick={handleLogout}
                      className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <a 
                href="/auth" 
                className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-200"
              >
                Sign In
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors duration-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="px-4">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={handleSearchKeyPress}
                    placeholder="Search..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Mobile Coins Display */}
              {user.isAuthenticated && (
                <div className="flex items-center justify-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-2 rounded-full mx-4">
                  <Coins className="w-4 h-4" />
                  <span className="font-semibold">{user.coins} coins</span>
                </div>
              )}

              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                <a 
                  href="/" 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  <Home className="w-4 h-4" />
                  <span>Home</span>
                </a>
                
                <a 
                  href="/products" 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  <Package className="w-4 h-4" />
                  <span>Products</span>
                </a>
                
                <a 
                  href="/wishlist" 
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50"
                >
                  <Heart className="w-4 h-4" />
                  <span>Wishlist</span>
                </a>

                <button className="flex items-center space-x-2 w-full px-4 py-2 text-left bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg mx-4">
                  <Plus className="w-4 h-4" />
                  <span>Add Item</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;