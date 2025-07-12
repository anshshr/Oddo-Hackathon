import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ArrowRight, 
  Star, 
  Users, 
  Shirt, 
  Coins, 
  Heart, 
  ShoppingBag, 
  Trophy,
  Sparkles,
  TrendingUp,
  Globe,
  Leaf,
  Gift,
  Camera,
  Clock,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  User,
  Filter
} from 'lucide-react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [coins, setCoins] = useState(0);
  const [scrollText, setScrollText] = useState(0);
  const galleryRef = useRef(null);

  const heroImages = [
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=600&fit=crop",
    "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=600&fit=crop"
  ];

  const categories = [
    { name: "Women's Fashion", count: "2,543", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=200&fit=crop" },
    { name: "Men's Clothing", count: "1,892", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=200&fit=crop" },
    { name: "Accessories", count: "756", image: "https://images.unsplash.com/photo-1506629905607-bb5269e4165b?w=300&h=200&fit=crop" },
    { name: "Shoes & Sneakers", count: "1,234", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=200&fit=crop" },
    { name: "Designer Items", count: "445", image: "https://images.unsplash.com/photo-1564257577-6b8d69c8e6c5?w=300&h=200&fit=crop" },
    { name: "Vintage Collection", count: "623", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=200&fit=crop" }
  ];

  const featuredItems = [
    {
      id: 1,
      name: "Vintage Denim Jacket",
      brand: "Levi's",
      size: "M",
      condition: "Like New",
      coins: 45,
      originalPrice: "$89",
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=400&fit=crop",
      likes: 23,
      owner: "Sarah K.",
      rating: 4.8
    },
    {
      id: 2,
      name: "Boho Maxi Dress",
      brand: "Free People",
      size: "S",
      condition: "Excellent",
      coins: 38,
      originalPrice: "$120",
      image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=400&fit=crop",
      likes: 31,
      owner: "Emma L.",
      rating: 4.9
    },
    {
      id: 3,
      name: "Designer Sneakers",
      brand: "Nike",
      size: "9",
      condition: "Good",
      coins: 52,
      originalPrice: "$150",
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=300&h=400&fit=crop",
      likes: 18,
      owner: "Alex M.",
      rating: 4.7
    },
    {
      id: 4,
      name: "Silk Blouse",
      brand: "Zara",
      size: "L",
      condition: "Like New",
      coins: 29,
      originalPrice: "$65",
      image: "https://images.unsplash.com/photo-1564257577-6b8d69c8e6c5?w=300&h=400&fit=crop",
      likes: 27,
      owner: "Maya P.",
      rating: 4.6
    },
    {
      id: 5,
      name: "Leather Handbag",
      brand: "Coach",
      size: "One Size",
      condition: "Excellent",
      coins: 78,
      originalPrice: "$200",
      image: "https://images.unsplash.com/photo-1506629905607-bb5269e4165b?w=300&h=400&fit=crop",
      likes: 45,
      owner: "Rachel T.",
      rating: 5.0
    },
    {
      id: 6,
      name: "Casual Hoodie",
      brand: "Supreme",
      size: "XL",
      condition: "Good",
      coins: 34,
      originalPrice: "$95",
      image: "https://images.unsplash.com/photo-1556821840-3a9fbc8b3150?w=300&h=400&fit=crop",
      likes: 19,
      owner: "Jake W.",
      rating: 4.4
    },
    {
      id: 7,
      name: "Summer Sandals",
      brand: "Birkenstock",
      size: "8",
      condition: "Like New",
      coins: 25,
      originalPrice: "$80",
      image: "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=300&h=400&fit=crop",
      likes: 12,
      owner: "Lisa M.",
      rating: 4.5
    },
    {
      id: 8,
      name: "Wool Sweater",
      brand: "Patagonia",
      size: "M",
      condition: "Excellent",
      coins: 42,
      originalPrice: "$110",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
      likes: 28,
      owner: "Tom B.",
      rating: 4.8
    }
  ];

  // Scrolling text animation
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollText(prev => prev - 1);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Gallery auto-scroll
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollGallery = (direction) => {
    if (galleryRef.current) {
      const scrollAmount = 300;
      galleryRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      

      {/* Big Scrolling Text */}
      <div className="bg-black text-white py-4 overflow-hidden relative">
        <div 
          className="flex whitespace-nowrap text-6xl font-bold"
          style={{ transform: `translateX(${scrollText}px)` }}
        >
          <span className="mr-20">REWEAR • SUSTAINABLE FASHION • SWAP & EARN • ECO-FRIENDLY • </span>
          <span className="mr-20">REWEAR • SUSTAINABLE FASHION • SWAP & EARN • ECO-FRIENDLY • </span>
          <span className="mr-20">REWEAR • SUSTAINABLE FASHION • SWAP & EARN • ECO-FRIENDLY • </span>
        </div>
      </div>

      {/* Hero Section with Image Gallery */}
      <div className="relative h-96 bg-gray-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Image Gallery Slider */}
        <div className="relative w-full h-full">
          {heroImages.map((image, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentSlide ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <img 
                src={image} 
                alt={`Hero ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-7xl font-bold mb-6 animate-pulse">
              Re<span className="text-green-400">Wear</span>
            </h1>
            <p className="text-2xl mb-8 max-w-2xl">
              Transform your wardrobe sustainably. Discover, swap, and earn.
            </p>
            <div className="flex gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Start Swapping <ArrowRight className="w-5 h-5 ml-2 inline" />
              </button>
              <button className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold backdrop-blur-sm transition-all duration-300">
                Browse Items
              </button>
            </div>
          </div>
        </div>

        {/* Gallery Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Categories Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Categories</h2>
            <button className="flex items-center text-gray-600 hover:text-gray-900">
              <Filter className="w-5 h-5 mr-2" />
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer">
                <div className="relative h-32">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20"></div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-sm text-gray-900 mb-1">{category.name}</h3>
                  <p className="text-xs text-gray-600">{category.count} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Product Listings with Horizontal Scroll */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Items</h2>
            <div className="flex items-center space-x-2">
              <button 
                onClick={() => scrollGallery('left')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scrollGallery('right')}
                className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div 
            ref={galleryRef}
            className="flex space-x-6 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {featuredItems.map((item) => (
              <div key={item.id} className="flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
                <div className="relative h-64">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <Heart className="w-5 h-5 text-gray-600 hover:text-red-500 cursor-pointer transition-colors" />
                  </div>
                  <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.condition}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {item.coins} <Coins className="w-3 h-3 inline ml-1" />
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg text-gray-900">{item.name}</h3>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600 ml-1">{item.rating}</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <span className="text-gray-600 text-sm">{item.brand}</span>
                      <span className="text-gray-400 text-sm ml-2">• Size {item.size}</span>
                    </div>
                    <span className="text-gray-500 line-through text-sm">{item.originalPrice}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center text-gray-500">
                      <User className="w-4 h-4 mr-1" />
                      <span className="text-sm">{item.owner}</span>
                    </div>
                    <div className="flex items-center text-gray-500">
                      <Heart className="w-4 h-4 mr-1" />
                      <span className="text-sm">{item.likes}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105">
                    Swap Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-green-500 mb-2">15K+</div>
              <div className="text-gray-600">Items Swapped</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-blue-500 mb-2">12K</div>
              <div className="text-gray-600">Happy Users</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-purple-500 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction Rate</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-4xl font-bold text-orange-500 mb-2">3.2M</div>
              <div className="text-gray-600">CO2 Saved (kg)</div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;