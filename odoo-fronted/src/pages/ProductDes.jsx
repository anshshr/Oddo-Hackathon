import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  Share2, 
  User, 
  Calendar, 
  Package, 
  Ruler, 
  Tag, 
  Star,
  MapPin,
  Clock,
  ShoppingBag,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { useParams } from 'react-router-dom';

const ProductDes = () => {
    const {id} = useParams();
  // For demo purposes, we'll use a static ID. In real app, get from useParams
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        
        // Replace with your actual API endpoint
        const response = await fetch(`http://localhost:5000/api/products/finddes/${id}`);
          console.log(response)
        if (!response.ok) {
          throw new Error('Product not found');
        }
        
        const data = await response.json();
        setProduct(data.product);
      } catch (err) {
        // For demo purposes, we'll use mock data
        console.warn('Using mock data:', err.message);
        
        // Mock product data based on your schema
        const mockProduct = {
          _id: id,
          title: "Classic Blue Denim Jacket",
          description: "Stylish light-wash denim jacket, lightly worn. Great for casual wear. This vintage-inspired piece adds character to any outfit and is perfect for layering during transitional seasons.",
          category: "Jacket",
          type: "Unisex",
          size: "M",
          images: [
            "https://images.unsplash.com/photo-1551537482-f2075a1d41f2?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1544966505-07ad5ff12f25?w=800&h=800&fit=crop",
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop"
          ],
          swapOption: "points",
          pointsRequired: 35,
          status: "available",
          ownerName: "Dhaval Rathod",
          ownerImage: "https://i.pravatar.cc/150?img=21",
          createdAt: new Date().toISOString()
        };
        
        setProduct(mockProduct);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Handle image navigation
  const nextImage = () => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === product.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (product?.images?.length > 1) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? product.images.length - 1 : prev - 1
      );
    }
  };

  // Handle make request
  const handleMakeRequest = async () => {
    try {
      // This would be your actual request API endpoint
      const response = await fetch('/api/swap-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: id,
          requestType: product.swapOption
        })
      });

      if (response.ok) {
        alert('Request sent successfully!');
      } else {
        alert('Failed to send request');
      }
    } catch (error) {
      console.error('Error making request:', error);
      alert('Error sending request');
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-blue-500 animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Product Not Found</h2>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  // Get status color
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'swapped':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get swap option display
  const getSwapOptionDisplay = (option, points) => {
    if (option === 'points') {
      return (
        <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg">
          <Star className="w-5 h-5 text-yellow-500" />
          <span className="font-semibold text-blue-700">{points} Points</span>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-2 bg-green-50 px-3 py-2 rounded-lg">
        <Package className="w-5 h-5 text-green-600" />
        <span className="font-semibold text-green-700">Direct Swap</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Image Gallery */}
            <div className="relative">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden relative">
                {product?.images?.length > 0 ? (
                  <>
                    <img 
                      src={product.images[currentImageIndex]} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package className="w-24 h-24 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Image thumbnails */}
              {product?.images?.length > 1 && (
                <div className="flex gap-2 mt-4 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        index === currentImageIndex ? 'border-blue-500' : 'border-gray-200'
                      }`}
                    >
                      <img 
                        src={image} 
                        alt={`${product.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{product?.title}</h1>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(product?.status)}`}>
                      {product?.status?.charAt(0).toUpperCase() + product?.status?.slice(1)}
                    </span>
                    {getSwapOptionDisplay(product?.swapOption, product?.pointsRequired)}
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsLiked(!isLiked)}
                    className={`p-3 rounded-full border-2 transition-all ${
                      isLiked 
                        ? 'bg-red-50 border-red-200 text-red-500' 
                        : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full border-2 border-gray-200 text-gray-500 hover:bg-gray-100 transition-all">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
                <p className="text-gray-700 leading-relaxed">{product?.description}</p>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Tag className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">Category</span>
                  </div>
                  <p className="font-semibold text-gray-900">{product?.category}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ShoppingBag className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">Type</span>
                  </div>
                  <p className="font-semibold text-gray-900">{product?.type}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Ruler className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">Size</span>
                  </div>
                  <p className="font-semibold text-gray-900">{product?.size}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span className="text-sm font-medium text-gray-500">Listed</span>
                  </div>
                  <p className="font-semibold text-gray-900">
                    {product?.createdAt ? new Date(product.createdAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>

              {/* Owner Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Owner Information</h3>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                    {product?.ownerImage ? (
                      <img 
                        src={product.ownerImage} 
                        alt={product.ownerName}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-lg">{product?.ownerName}</p>
                    <p className="text-gray-600 text-sm">Product Owner</p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={handleMakeRequest}
                  disabled={product?.status !== 'available'}
                  className={`flex-1 py-4 px-6 rounded-lg font-semibold text-white transition-all ${
                    product?.status === 'available'
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center justify-center gap-2">
                    {product?.status === 'available' ? (
                      <>
                        <CheckCircle className="w-5 h-5" />
                        Make Request
                      </>
                    ) : (
                      <>
                        <Clock className="w-5 h-5" />
                        Not Available
                      </>
                    )}
                  </div>
                </button>
                <button className="py-4 px-6 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-all">
                  <MessageCircle className="w-5 h-5 mx-auto" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDes;