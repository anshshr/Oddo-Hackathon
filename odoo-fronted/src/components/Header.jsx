import React, { useState, useEffect } from 'react';
import { FaClock, FaCalendarAlt, FaExclamationTriangle, FaChartLine, FaUserFriends, FaMobileAlt, FaBuilding } from 'react-icons/fa';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <nav className="bg-gray-900 shadow-md py-4 w-full z-50 border-b border-gray-800">
      <div className="container mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FaClock className="text-white text-2xl" />
          </div>
          <span className="ml-3 text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">QueueWise Pro</span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-300 hover:text-blue-400 transition-colors">Features</a>
          <a href="#benefits" className="text-gray-300 hover:text-blue-400 transition-colors">Benefits</a>
          <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a>
          <Link to="dashboard" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center">
            Get Started <FiArrowRight className="ml-2" />
          </Link>
        </div>
        <div className="md:hidden">
          <button className="text-gray-300">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Header