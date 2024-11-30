import { useState, useRef, useEffect } from 'react';
import Account from '../pages/Account'
import { useAuth } from '../contexts/AuthContext';

import SearchBar from './SearchBar'
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);

  const { user, logout } = useAuth();

  const  navigate = useNavigate();

  const categories = [
    "Phones", "Computers", "Smartwatch", "Camera", "Headphones", "Gaming"
  ];

  const handleClick = (e) => {
    if (buttonRef.current && !buttonRef.current.contains(e.target)) {
      setIsOpen(false)
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Logout successful');
      
    } catch (error) {
      toast.error('Failed to logout');
    }
  }

  return (
    <nav className="bg-white border-b relative z-50" onClick={handleClick}>
      {/* Top Bar */}
      <div className="bg-black text-white py-2">
        <div className="container mx-auto px-6 text-center text-sm">
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
          <a href="#" className="ml-2 font-semibold">ShopNow</a>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto px-4 md:px-20">
        <div className="flex items-center justify-between gap-4 h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold">Exclusive</Link>

          {/* Navigation Links - Desktop */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="hover:text-red-500">Home</Link>
            <Link to="/about" className="hover:text-red-500">About</Link>
            <Link to="/contact" className="hover:text-red-500">Contact</Link>
            <Link to="/allproducts" className="hover:text-red-500">All Products</Link>
            {/* <div className="relative">
              <button 
                className="hover:text-red-500"
                onMouseEnter={() => setShowCategories(true)}
                onMouseLeave={() => setShowCategories(false)}
              >
                Categories
              </button>
              {showCategories && (
                <div 
                  className="absolute top-full left-0 bg-white shadow-lg rounded-md py-2 w-48 z-50"
                  onMouseEnter={() => setShowCategories(true)}
                  onMouseLeave={() => setShowCategories(false)}
                >
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      to={`/category/${category.toLowerCase()}`}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      {category}
                    </Link>
                  ))}
                </div>
              )}
            </div> */}
          </div>

          {/* Search Bar */}
          <SearchBar />
          
          {/* Right Icons */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link to="/wishlist" className="hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </Link>
            <span >
            <Link to="/cart" className="hover:text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </Link>
            </span>
            <span
              ref={buttonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 mb-0 hover:bg-gray-100 rounded-full transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            { isOpen && <Account /> }
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-100">Home</Link>
            <Link to="/contact" className="block px-3 py-2 rounded-md hover:bg-gray-100">Contact</Link>
            <Link to="/about" className="block px-3 py-2 rounded-md hover:bg-gray-100">About</Link>
            {/* <button 
              onClick={() => setShowCategories(!showCategories)}
              className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
            >
              Categories
            </button> */}
            {/* {showCategories && (
              <div className="pl-6 relative">
                {categories.map((category, index) => (
                  <Link
                    key={index}
                    to={`/category/${category.toLowerCase()}`}
                    className="block px-3 py-2 rounded-md hover:bg-gray-100 absolute z-50"
                  >
                    {category}
                  </Link>
                ))}
              </div>
            )} */}
            <Link to="/allproducts" className="block px-3 py-2 rounded-md hover:bg-gray-100">All Products</Link>
            {user ? (
        <span 
          onClick={handleLogout}
          className="block w-full text-left px-3 py-2 rounded-md hover:bg-gray-100 text-red-500"
        >
          Logout
          <Link to="/" className="block px-3 py-2 rounded-md hover:bg-gray-100" />
        </span>
      ) : (
        <div>
        <Link to="/login" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          Login
        </Link>
        <Link  to="/signup" className="block px-3 py-2 rounded-md hover:bg-gray-100">
          Sign Up
        </Link>
        </div>
      )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;


