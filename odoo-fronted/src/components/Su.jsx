import React, { useState } from 'react';
import { Gift, Coins, CheckCircle, Sparkles, X, Star } from 'lucide-react';

const Su = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [coins, setCoins] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);

  const rewards = [
    { coins: 50, item: "Premium T-Shirt" },
    { coins: 100, item: "Designer Hoodie" },
    { coins: 75, item: "Stylish Jeans" },
    { coins: 125, item: "Luxury Jacket" },
    { coins: 60, item: "Casual Sneakers" },
    { coins: 90, item: "Winter Scarf" }
  ];

  const handleClaimReward = () => {
    const randomReward = rewards[Math.floor(Math.random() * rewards.length)];
    setCoins(randomReward.coins);
    setIsOpen(true);
    setShowAnimation(true);
    
    // Reset animation after 1 second
    setTimeout(() => setShowAnimation(false), 1000);
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <div className="  flex items-center justify-center ">
      {/* Claim Button */}
      <button
        onClick={handleClaimReward}
        className="group relative bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center space-x-3"
      >
        <Gift className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
        <span className="text-lg">Claim Your Cloth wear</span>
        <Sparkles className="w-5 h-5 group-hover:animate-pulse" />
      </button>

      {/* Popup Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closePopup}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header with animated background */}
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-6 text-white relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 animate-pulse opacity-50"></div>
              <div className="relative z-10 text-center">
                <div className="flex justify-center mb-4">
                  <div className="bg-white rounded-full p-3 shadow-lg">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2">Congratulations!</h2>
                <p className="text-green-100">You've successfully claimed your reward!</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 text-center">
              {/* Coins Display */}
              <div className="mb-6">
                <div className="flex justify-center items-center space-x-2 mb-3">
                  <Coins className={`w-8 h-8 text-yellow-500 ${showAnimation ? 'animate-bounce' : ''}`} />
                  <span className="text-3xl font-bold text-gray-800">+{coins}</span>
                  <span className="text-lg text-gray-600">coins</span>
                </div>
                <div className="flex justify-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Success Message */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  🎉 This Product is Now Yours!
                </h3>
                <p className="text-gray-600 mb-2">
                  You've earned <span className="font-bold text-purple-600">{coins} coins</span> and unlocked an amazing reward!
                </p>
                <p className="text-sm text-gray-500">
                  Thank you for claiming this exclusive item. Your account has been updated with your new coins.
                </p>
              </div>

              {/* Product Info */}
              

              {/* Action Button */}
              <button
                onClick={closePopup}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Awesome! Continue Shopping
              </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              <div className="absolute top-4 left-4 w-2 h-2 bg-yellow-300 rounded-full animate-ping"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-pink-300 rounded-full animate-pulse"></div>
              <div className="absolute bottom-4 left-8 w-2 h-2 bg-blue-300 rounded-full animate-bounce"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Su;