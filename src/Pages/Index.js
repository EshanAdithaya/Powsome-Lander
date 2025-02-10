import React, { useState } from 'react';
import { Heart, Star, Download, Menu, X, ShoppingBag, Tag, Clock, Sparkles } from 'lucide-react';

const FlashSaleTimer = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="bg-white text-orange-500 rounded-lg px-2 py-1">04</div>
      <span>:</span>
      <div className="bg-white text-orange-500 rounded-lg px-2 py-1">23</div>
      <span>:</span>
      <div className="bg-white text-orange-500 rounded-lg px-2 py-1">59</div>
    </div>
  );
};

const PetDocLanding = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation (Same as before) */}
      
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-12 md:pb-20">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-12 md:mb-0 text-center md:text-left">
            <div className="inline-block bg-orange-100 text-orange-500 rounded-full px-4 py-1 mb-4">
              🐾 #1 Pet Care App
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your furry friend's happiness starts here
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Everything your pet needs - vet care, grooming, food, and more!
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
              <button className="bg-teal-500 text-white px-6 py-3 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Download className="mr-2" size={20} />
                App Store
              </button>
              <button className="bg-teal-500 text-white px-6 py-3 rounded-full flex items-center justify-center hover:bg-teal-600 transition-colors">
                <Download className="mr-2" size={20} />
                Play Store
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/api/placeholder/300/600" alt="App mockup with cute pets" className="h-72 md:h-96 object-contain" />
          </div>
        </div>
      </div>

      {/* Flash Sale Section */}
      <div className="bg-orange-500 text-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <Sparkles className="mr-2" />
              <h2 className="text-2xl font-bold">Flash Sale!</h2>
              <FlashSaleTimer />
            </div>
            <button className="bg-white text-orange-500 px-6 py-2 rounded-full hover:bg-orange-50 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            🐱 Trending Pet Products 🐶
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <img src="/api/placeholder/200/200" alt={`Product ${item}`} className="w-full h-48 object-cover" />
                  <div className="absolute top-2 right-2 bg-orange-500 text-white text-sm px-2 py-1 rounded-full">
                    -20%
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold mb-2">Premium Pet Food</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-orange-500 font-bold">$24.99</span>
                    <button className="bg-teal-500 text-white p-2 rounded-full">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Coupon Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            🎉 Special Offers & Coupons 🎁
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((coupon) => (
              <div key={coupon} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="bg-gradient-to-r from-teal-500 to-orange-500 h-2" />
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className="text-sm text-gray-500">Limited Time</span>
                      <h3 className="text-xl font-bold">Save 25% Off</h3>
                    </div>
                    <Tag className="text-orange-500" />
                  </div>
                  <p className="text-gray-600 mb-4">On your first grooming session</p>
                  <div className="bg-gray-100 p-3 rounded-lg text-center">
                    <code className="text-orange-500 font-bold">PETLOVE25</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pet Categories */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Shop by Pet Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Dogs', 'Cats', 'Birds', 'Fish'].map((category) => (
              <div key={category} className="relative group cursor-pointer">
                <img 
                  src="/api/placeholder/300/300" 
                  alt={category}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl" />
                <h3 className="absolute bottom-4 left-4 text-white font-bold text-xl">
                  {category}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* App Features Section */}
      <div className="bg-gradient-to-b from-teal-500 to-teal-600 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              More than just shopping
            </h2>
            <p className="text-lg opacity-90">
              Complete pet care solution in your pocket
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Vet Consultations</h3>
              <p className="opacity-90">24/7 access to qualified veterinarians</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Quick Delivery</h3>
              <p className="opacity-90">Same-day delivery for essential items</p>
            </div>
            <div className="text-center p-6">
              <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2">Grooming</h3>
              <p className="opacity-90">Professional grooming at your doorstep</p>
            </div>
          </div>
        </div>
      </div>

      {/* Download Section */}
      <div className="bg-orange-500 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Download PETDOC today
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of happy pet parents!
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button className="bg-white text-orange-500 px-6 py-3 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">
              <Download className="mr-2" size={20} />
              App Store
            </button>
            <button className="bg-white text-orange-500 px-6 py-3 rounded-full flex items-center justify-center hover:bg-orange-50 transition-colors">
              <Download className="mr-2" size={20} />
              Play Store
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="text-orange-500 mr-2" size={24} />
            <span className="text-xl font-bold">PETDOC</span>
          </div>
          <p className="text-gray-600">© 2025 PETDOC. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PetDocLanding;