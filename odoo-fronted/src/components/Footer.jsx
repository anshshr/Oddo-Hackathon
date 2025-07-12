import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Youtube,
  Linkedin,
  Send,
  ArrowRight,
  Sparkles,
  Heart,
  Shield,
  Truck,
  RefreshCw,
  Award,
  Globe,
  Smartphone,
  Apple,
  PlayCircle,
  CheckCircle,
  Star,
  Users,
  Leaf,
  Recycle,
  TrendingUp,
  Gift
} from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    'Shop': [
      { name: 'Women\'s Fashion', href: '#' },
      { name: 'Men\'s Clothing', href: '#' },
      { name: 'Accessories', href: '#' },
      { name: 'Shoes & Sneakers', href: '#' },
      { name: 'Designer Items', href: '#' },
      { name: 'Vintage Collection', href: '#' }
    ],
    'Account': [
      { name: 'My Profile', href: '#' },
      { name: 'My Swaps', href: '#' },
      { name: 'Coin Wallet', href: '#' },
      { name: 'Wishlist', href: '#' },
      { name: 'Order History', href: '#' },
      { name: 'Settings', href: '#' }
    ],
    'Support': [
      { name: 'Help Center', href: '#' },
      { name: 'Contact Us', href: '#' },
      { name: 'Size Guide', href: '#' },
      { name: 'Shipping Info', href: '#' },
      { name: 'Return Policy', href: '#' },
      { name: 'FAQ', href: '#' }
    ],
    'Company': [
      { name: 'About ReWear', href: '#' },
      { name: 'Sustainability', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Careers', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Investors', href: '#' }
    ]
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: '#', color: 'hover:text-pink-600' },
    { name: 'YouTube', icon: Youtube, href: '#', color: 'hover:text-red-600' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-700' }
  ];

  const features = [
    { icon: Shield, title: 'Secure Transactions', desc: 'Protected payments' },
    { icon: Truck, title: 'Fast Shipping', desc: 'Free delivery over $50' },
    { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
    { icon: Award, title: 'Quality Verified', desc: 'Authenticated items' }
  ];

  const stats = [
    { number: '50K+', label: 'Happy Users', icon: Users },
    { number: '2.3M', label: 'Items Swapped', icon: RefreshCw },
    { number: '98%', label: 'Satisfaction', icon: Star },
    { number: '1.8M kg', label: 'CO2 Saved', icon: Leaf }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Mail className="w-8 h-8 text-white" />
            </div>
          </div>
          
          <h2 className="text-4xl font-bold mb-4">Stay in the Loop</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Get the latest sustainable fashion trends, exclusive swaps, and eco-friendly tips delivered to your inbox.
          </p>
          
          <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white placeholder-white/70 focus:outline-none focus:border-white/50"
                required
              />
              <button
                type="submit"
                className="bg-white text-green-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                {subscribed ? <CheckCircle className="w-5 h-5" /> : <Send className="w-5 h-5" />}
              </button>
            </div>
            {subscribed && (
              <p className="mt-4 text-white/90 animate-fade-in">
                ✨ Thanks for subscribing! Welcome to the ReWear community.
              </p>
            )}
          </form>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-3">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold">ReWear</span>
              </div>
              
              <p className="text-gray-400 mb-6 leading-relaxed">
                ReWear is revolutionizing sustainable fashion by connecting eco-conscious individuals to swap, 
                share, and discover amazing pre-loved clothing. Join our community and make fashion circular.
              </p>
              
              <div className="flex items-center mb-4">
                <Heart className="w-5 h-5 text-red-500 mr-2" />
                <span className="text-sm text-gray-400">Made with love for the planet</span>
              </div>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 hover:scale-110`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-lg font-semibold mb-6 text-white">{category}</h3>
                <ul className="space-y-3">
                  {links.map((link, index) => (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                      >
                        {link.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mr-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-semibold text-white text-sm">{feature.title}</h4>
                  <p className="text-gray-400 text-xs">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Download Section */}
      <div className="bg-gray-800 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-white mb-2">Download Our App</h3>
            <p className="text-gray-400">Swap on the go with our mobile app</p>
          </div>
          
          <div className="flex justify-center space-x-4">
            <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 transform hover:scale-105">
              <Apple className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Download on the</div>
                <div className="text-sm font-semibold">App Store</div>
              </div>
            </button>
            
            <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg flex items-center space-x-3 transition-all duration-300 transform hover:scale-105">
              <PlayCircle className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-gray-400">Get it on</div>
                <div className="text-sm font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Email Us</h4>
              <p className="text-gray-400">support@rewear.com</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Call Us</h4>
              <p className="text-gray-400">+1 (555) 123-4567</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-2">Visit Us</h4>
              <p className="text-gray-400">123 Fashion Ave, NYC</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black py-6 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6">
              <p className="text-gray-400 text-sm">
                © 2025 ReWear. All rights reserved.
              </p>
              <div className="flex items-center space-x-4">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </a>
                <span className="text-gray-600">•</span>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="flex items-center">
                <Globe className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-gray-400 text-sm">English (US)</span>
              </div>
              <div className="flex items-center">
                <Recycle className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-gray-400 text-sm">Carbon Neutral</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </footer>
  );
};

export default Footer;