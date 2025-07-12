import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CreatePro from './CreatePro';
import { 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Coins, 
  Package, 
  ShoppingBag,
  Heart,
  Star,
  Settings,
  Camera,
  Edit3,
  Recycle,
  Award,
  TrendingUp,
  Activity,
  Users,
  Tag,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader
} from 'lucide-react';

const Userprofile = () => {
  const { userId } = useParams();
  const [userDetail, setUserDetail] = useState(null);
  const [myListings, setMyListings] = useState([]);
  const [myPurchases, setMyPurchases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('listings');

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      setError('');

      // Fetch user details
      const userResponse = await fetch('http://localhost:5000/api/user/profile', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-token'}`,
        },
      });

      if (!userResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      const userData = await userResponse.json();
      setUserDetail(userData.userDetail);

      // Fetch user's listings
      const listingsResponse = await fetch('http://localhost:5000/api/products/owner', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-token'}`,
        },
      });

      if (listingsResponse.ok) {
        const listingsData = await listingsResponse.json();
        setMyListings(listingsData.products || []);
      }

      // Fetch user's purchases
      const purchasesResponse = await fetch('http://localhost:5000/api/products/swapped', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token') || 'demo-token'}`,
        },
      });

      if (purchasesResponse.ok) {
        const purchasesData = await purchasesResponse.json();
        setMyPurchases(purchasesData.products || []);
      }

    } catch (err) {
      setError(err.message || 'Failed to load user data');
      // Set demo data for display purposes
      setUserDetail({
        fullName: 'Demo User',
        profilePhoto: null,
        bio: 'Passionate about sustainable fashion and eco-friendly choices.',
        address: {
          street: '123 Green Street',
          city: 'Eco City',
          state: 'Gujarat',
          postalCode: '380001',
          country: 'India'
        },
        phoneNumber: '+91 9876543210',
        gender: 'Prefer not to say',
        dateOfBirth: '1995-06-15',
        coins: 1250,
        joinedOn: '2024-01-15'
      });
      setMyListings([
        {
          _id: '1',
          title: 'Vintage Denim Jacket',
          description: 'Classic blue denim jacket in excellent condition',
          category: 'Outerwear',
          type: 'Unisex',
          size: 'M',
          condition: 'Good',
          images: ['https://via.placeholder.com/300x300/4ade80/ffffff?text=Denim+Jacket'],
          swapOption: 'swap',
          pointsRequired: 0,
          status: 'available',
          tags: ['vintage', 'casual', 'denim'],
          createdAt: '2024-12-01'
        },
        {
          _id: '2',
          title: 'Floral Summer Dress',
          description: 'Beautiful floral pattern dress, perfect for summer',
          category: 'Dress',
          type: 'Women',
          size: 'S',
          condition: 'Like New',
          images: ['https://via.placeholder.com/300x300/f87171/ffffff?text=Summer+Dress'],
          swapOption: 'points',
          pointsRequired: 500,
          status: 'pending',
          tags: ['floral', 'summer', 'casual'],
          createdAt: '2024-11-28'
        }
      ]);
      setMyPurchases([
        {
          _id: '3',
          title: 'Designer Handbag',
          description: 'Luxury designer handbag in mint condition',
          category: 'Accessories',
          type: 'Women',
          condition: 'New',
          images: ['https://via.placeholder.com/300x300/8b5cf6/ffffff?text=Handbag'],
          swapOption: 'points',
          pointsRequired: 800,
          status: 'swapped',
          ownerName: 'Sarah Johnson',
          ownerImage: 'https://via.placeholder.com/40x40/06b6d4/ffffff?text=SJ',
          updatedAt: '2024-11-20'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'swapped': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-3 h-3" />;
      case 'pending': return <Clock className="w-3 h-3" />;
      case 'swapped': return <Recycle className="w-3 h-3" />;
      default: return <AlertCircle className="w-3 h-3" />;
    }
  };

  const ProductCard = ({ product, isPurchase = false }) => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
      <div className="relative">
        <img
          src={product.images?.[0] || 'https://via.placeholder.com/300x300/e5e7eb/6b7280?text=No+Image'}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(product.status)}`}>
            {getStatusIcon(product.status)}
            {product.status}
          </span>
        </div>
        {product.swapOption === 'points' && (
          <div className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1">
            <Coins className="w-3 h-3" />
            {product.pointsRequired}
          </div>
        )}
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-1">{product.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {product.category}
            </span>
            <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
              {product.type}
            </span>
          </div>
          <span className="text-sm font-medium text-gray-600">Size: {product.size}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">
            Condition: <span className="font-medium">{product.condition}</span>
          </span>
          {isPurchase && product.ownerName && (
            <div className="flex items-center gap-2">
              <img
                src={product.ownerImage || 'https://via.placeholder.com/24x24/6b7280/ffffff?text=U'}
                alt={product.ownerName}
                className="w-6 h-6 rounded-full"
              />
              <span className="text-xs text-gray-500">{product.ownerName}</span>
            </div>
          )}
        </div>
        
        {product.tags && product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="bg-green-50 text-green-700 px-2 py-1 rounded-full text-xs">
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-8 h-8 animate-spin mx-auto mb-4 text-green-600" />
          <p className="text-gray-600">Loading user dashboard...</p>
        </div>
      </div>
    );
  }

  if (error && !userDetail) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Profile</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchUserData}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-800">User Dashboard</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
                <Coins className="w-4 h-4 text-green-600" />
                <span className="text-green-700 font-medium">{userDetail?.coins || 0} coins</span>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Profile Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Profile Photo */}
            <div className="flex-shrink-0">
              <div className="relative">
                <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center overflow-hidden">
                  {userDetail?.profilePhoto ? (
                    <img
                      src={userDetail.profilePhoto}
                      alt={userDetail.fullName}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <User className="w-16 h-16 text-white" />
                  )}
                </div>
                <button className="absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg border hover:shadow-xl transition-shadow">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">{userDetail?.fullName}</h2>
                  <p className="text-gray-600 mb-4">{userDetail?.bio || 'No bio available'}</p>
                </div>



                <CreatePro/>
                <button className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-green-50 p-4 rounded-lg text-center">
                  <Package className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-green-700">{myListings.length}</div>
                  <div className="text-sm text-green-600">Listings</div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <ShoppingBag className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-blue-700">{myPurchases.length}</div>
                  <div className="text-sm text-blue-600">Purchases</div>
                </div>
                <div className="bg-yellow-50 p-4 rounded-lg text-center">
                  <Award className="w-6 h-6 text-yellow-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-yellow-700">{userDetail?.coins || 0}</div>
                  <div className="text-sm text-yellow-600">Coins</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <Activity className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                  <div className="text-xl font-bold text-purple-700">
                    {Math.floor(Math.random() * 50) + 20}
                  </div>
                  <div className="text-sm text-purple-600">Swaps</div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  {userDetail?.phoneNumber && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{userDetail.phoneNumber}</span>
                    </div>
                  )}
                  {userDetail?.dateOfBirth && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{formatDate(userDetail.dateOfBirth)}</span>
                    </div>
                  )}
                  {userDetail?.gender && (
                    <div className="flex items-center gap-3">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{userDetail.gender}</span>
                    </div>
                  )}
                </div>
                <div className="space-y-3">
                  {userDetail?.address && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="text-gray-700">
                        {[
                          userDetail.address.street,
                          userDetail.address.city,
                          userDetail.address.state,
                          userDetail.address.postalCode,
                          userDetail.address.country
                        ].filter(Boolean).join(', ')}
                      </div>
                    </div>
                  )}
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-700">
                      Joined {formatDate(userDetail?.joinedOn)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="border-b">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('listings')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'listings'
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  My Listings ({myListings.length})
                </div>
              </button>
              <button
                onClick={() => setActiveTab('purchases')}
                className={`px-6 py-4 font-medium transition-colors ${
                  activeTab === 'purchases'
                    ? 'text-green-600 border-b-2 border-green-600 bg-green-50'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4" />
                  My Purchases ({myPurchases.length})
                </div>
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'listings' && (
              <div>
                {myListings.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myListings.map((product) => (
                      <ProductCard key={product._id} product={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Listings Yet</h3>
                    <p className="text-gray-600 mb-4">Start selling your items to build your collection!</p>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Create First Listing
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'purchases' && (
              <div>
                {myPurchases.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {myPurchases.map((product) => (
                      <ProductCard key={product._id} product={product} isPurchase={true} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">No Purchases Yet</h3>
                    <p className="text-gray-600 mb-4">Browse items to start your sustainable fashion journey!</p>
                    <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                      Browse Items
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Userprofile;