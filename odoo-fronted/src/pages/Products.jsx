import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Star, 
  Clock, 
  User, 
  Package, 
  Tag, 
  Eye, 
  Heart,
  ArrowUpDown,
  Calendar,
  MapPin,
  CheckCircle,
  AlertCircle,
  Loader2,
  Grid3X3,
  List,
  Zap,
  Camera,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedSwapOption, setSelectedSwapOption] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [viewMode, setViewMode] = useState('grid');
  const [likedProducts, setLikedProducts] = useState(new Set());

  // Mock data for demonstration
  const mockProducts = [
    {
      _id: '1',
      title: 'iPhone 14 Pro Max',
      description: 'Excellent condition iPhone 14 Pro Max with original box and accessories. Used for 6 months, no scratches or dents.',
      category: 'Electronics',
      type: 'Like New',
      size: 'N/A',
      images: [
        'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400',
        'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
      ],
      swapOption: 'points',
      pointsRequired: 850,
      status: 'available',
      ownerId: 'user1',
      ownerName: 'John Doe',
      ownerImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
      createdAt: '2024-01-15T10:30:00Z'
    },
    {
      _id: '2',
      title: 'Nike Air Jordan 1 Retro',
      description: 'Classic Air Jordan 1 in great condition. Size 10.5 US. Perfect for sneaker enthusiasts.',
      category: 'Clothing',
      type: 'Good',
      size: '10.5',
      images: [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400'
      ],
      swapOption: 'swap',
      pointsRequired: 0,
      status: 'available',
      ownerId: 'user2',
      ownerName: 'Sarah Wilson',
      ownerImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
      createdAt: '2024-01-14T15:45:00Z'
    },
    {
      _id: '3',
      title: 'MacBook Pro 16" M2',
      description: 'Professional laptop in excellent condition. Perfect for developers and designers. Includes charger and case.',
      category: 'Electronics',
      type: 'Like New',
      size: '16"',
      images: [
        'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
        'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400'
      ],
      swapOption: 'points',
      pointsRequired: 1200,
      status: 'pending',
      ownerId: 'user3',
      ownerName: 'Mike Chen',
      ownerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
      createdAt: '2024-01-13T09:20:00Z'
    },
    {
      _id: '4',
      title: 'Vintage Leather Jacket',
      description: 'Authentic vintage leather jacket from the 80s. Genuine leather with unique patina. Size Medium.',
      category: 'Clothing',
      type: 'Good',
      size: 'M',
      images: [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400'
      ],
      swapOption: 'swap',
      pointsRequired: 0,
      status: 'available',
      ownerId: 'user4',
      ownerName: 'Emma Davis',
      ownerImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
      createdAt: '2024-01-12T14:10:00Z'
    },
    {
      _id: '5',
      title: 'Sony PlayStation 5',
      description: 'Brand new PlayStation 5 console with controller. Still in original packaging. Perfect for gaming.',
      category: 'Electronics',
      type: 'New',
      size: 'N/A',
      images: [
        'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400'
      ],
      swapOption: 'points',
      pointsRequired: 950,
      status: 'swapped',
      ownerId: 'user5',
      ownerName: 'Alex Johnson',
      ownerImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100',
      createdAt: '2024-01-11T11:30:00Z'
    },
    {
      _id: '6',
      title: 'Canon EOS R5 Camera',
      description: 'Professional mirrorless camera with 24-70mm lens. Excellent for photography and videography.',
      category: 'Electronics',
      type: 'Like New',
      size: 'N/A',
      images: [
        'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400'
      ],
      swapOption: 'swap',
      pointsRequired: 0,
      status: 'available',
      ownerId: 'user6',
      ownerName: 'Lisa Brown',
      ownerImage: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?w=100',
      createdAt: '2024-01-10T16:20:00Z'
    }
  ];

  const categories = ['all', 'Electronics', 'Clothing', 'Books', 'Home & Garden', 'Sports', 'Toys', 'Beauty', 'Automotive', 'Other'];
  const statuses = ['all', 'available', 'pending', 'swapped'];
  const swapOptions = ['all', 'swap', 'points'];

  // Simulate API call
  useEffect(() => {
   const fetchAllProducts = async () => {
  try {
    const response = await fetch(`http://localhost:5000/api/products/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });


    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    setProducts(data.products);
    console.log(data.products);
    setLoading(false);
    return {
      success: true,
      products: data.products || [],
      message: 'Products fetched successfully'
    };
  } catch (error) {
    console.error('Error fetching products:', error);
     setLoading(false);
    return {
      success: false,
      products: [],
      message: error.message || 'Failed to fetch products'
    };
  }
};
fetchAllProducts();
  }, []);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesStatus = selectedStatus === 'all' || product.status === selectedStatus;
      const matchesSwapOption = selectedSwapOption === 'all' || product.swapOption === selectedSwapOption;
      
      return matchesSearch && matchesCategory && matchesStatus && matchesSwapOption;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'points-high':
          return b.pointsRequired - a.pointsRequired;
        case 'points-low':
          return a.pointsRequired - b.pointsRequired;
        case 'title':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

  const toggleLike = (productId) => {
    setLikedProducts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'swapped':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available':
        return <CheckCircle className="w-3 h-3" />;
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'swapped':
        return <AlertCircle className="w-3 h-3" />;
      default:
        return <AlertCircle className="w-3 h-3" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const ImageCarousel = ({ images, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImage = () => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
      setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
      <div className="relative group">
        <img
          src={images[currentIndex]}
          alt={title}
          className="w-full h-48 object-cover"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black bg-opacity-50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                  }`}
                />
              ))}
            </div>
          </>
        )}
        
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
          <Camera className="w-3 h-3" />
          {images.length}
        </div>
      </div>
    );
  };

  const ProductCard = ({ product }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-100">
      <div className="relative">
        <ImageCarousel images={product.images} title={product.title} />
        
        <button
          onClick={() => toggleLike(product._id)}
          className="absolute top-3 left-3 p-2 bg-white bg-opacity-90 rounded-full hover:bg-opacity-100 transition-all"
        >
          <Heart
            className={`w-5 h-5 ${
              likedProducts.has(product._id) 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-600'
            }`}
          />
        </button>

        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border flex items-center gap-1 ${getStatusColor(product.status)}`}>
          {getStatusIcon(product.status)}
          {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{product.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2 mb-3">{product.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
          <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium">
            {product.type}
          </span>
          {product.size !== 'N/A' && (
            <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs font-medium">
              {product.size}
            </span>
          )}
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <img
              src={product.ownerImage}
              alt={product.ownerName}
              className="w-8 h-8 rounded-full border-2 border-gray-200"
            />
            <div>
              <p className="text-sm font-semibold text-gray-800">{product.ownerName}</p>
              <p className="text-xs text-gray-500 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(product.createdAt)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {product.swapOption === 'points' ? (
              <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                <Star className="w-4 h-4" />
                <span className="text-sm font-semibold">{product.pointsRequired} pts</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <ArrowUpDown className="w-4 h-4" />
                <span className="text-sm font-semibold">Swap</span>
              </div>
            )}
          </div>
          
          <Link to={`/productdes/${product._id}`} className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View
          </Link>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
          <span className="text-lg font-semibold text-gray-700">Loading products...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Products</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                <Package className="w-8 h-8 text-blue-600" />
                Product Dashboard
              </h1>
              <p className="text-gray-600 mt-1">Discover amazing products available for swap</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-600' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
                </option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            {/* Swap Option Filter */}
            <select
              value={selectedSwapOption}
              onChange={(e) => setSelectedSwapOption(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {swapOptions.map(option => (
                <option key={option} value={option}>
                  {option === 'all' ? 'All Options' : option.charAt(0).toUpperCase() + option.slice(1)}
                </option>
              ))}
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="points-high">Points: High to Low</option>
              <option value="points-low">Points: Low to High</option>
              <option value="title">Title A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {products.length} products
          </p>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria</p>
          </div>
        ) : (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;