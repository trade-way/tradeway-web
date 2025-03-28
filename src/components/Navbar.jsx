import React from 'react'
import { Button } from "@/components/ui/button"
import { Search, ChevronDown, ShoppingCart, User2Icon, UserCircle, UserCircle2Icon} from 'lucide-react'
import { useState } from 'react';
// import { Input } from "./components/ui/input";
import { Menu } from 'lucide-react'; // Add this import



const Navbar = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleShopClick = () => {
    setIsShopOpen(!isShopOpen);
    setIsProfileOpen(false);
  };

  const handleProfileClick = () => {
    setIsProfileOpen(!isProfileOpen);
    setIsShopOpen(false);
  };

  return (
    <nav className='px-4 md:px-8 lg:px-16 py-4 flex items-center justify-between bg-white'>
      {/* Logo & Search */}
      <div className='flex items-center gap-4 md:gap-8'>
        <img src="./images/logo.png" alt="Tradeway" className="h-8 md:h-12" />
        <div className='hidden md:flex relative items-center'>
          <div className='absolute left-3'>
            <Search className='h-5 w-5 text-gray-400' />
          </div>
          <input 
            type="text" 
            placeholder='Search Product or Brand here ....' 
            className='w-[300px] lg:w-[500px] pl-10 pr-4 py-2.5 rounded-full border border-gray-200 outline-none focus:border-blue-500'
          />
        </div>
      </div>

      {/* Mobile Menu Button */}
      <button 
        className='md:hidden'
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu className='h-6 w-6' />
      </button>

      {/* Navigation - Desktop */}
      <div className='hidden md:flex items-center gap-8'>
        <ul className='flex items-center gap-8 font-medium'>
          <li>
            <a href="/" className='text-blue-700'>Home</a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <li className="relative">
              <button 
                className='flex items-center gap-1 hover:text-blue-700'
                onClick={handleShopClick}
              >
                Shop
                <ChevronDown className={`h-4 w-4 transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isShopOpen && (
                <div className="absolute top-[calc(100%+0.5rem)] left-0 w-48 bg-white rounded-sm shadow-lg p-2 z-50">
                  <a href="/new-arrival" className="block px-4 py-2 hover:bg-gray-50 border-2 border-gray-400 mb-2 rounded-xs">
                    New Arrival
                  </a>
                  <a href="/best-sellers" className="block px-4 py-2 hover:bg-gray-50 border-2 border-gray-400 mb-2 rounded-xs">
                    Best Sellers
                  </a>
                  <a href="/apparel" className="block px-4 py-2 hover:bg-gray-50 border-2 border-gray-400 mb-2 rounded-xs">
                    Apparel
                  </a>
                  <a href="/home-decor" className="block px-4 py-2 hover:bg-gray-50 border-2 border-gray-400 mb-2 rounded-xs">
                    Home & Decor
                  </a>
                  <a href="/tech-gadgets" className="block px-4 py-2 hover:bg-gray-50 border-2 border-gray-400 mb-2 rounded-xs">
                    Tech & Gadgets
                  </a>
                  <a href="/unique-finds" className="block px-4 py-2 hover:bg-gray-50 border-2 border-gray-400 mb-2 rounded-xs">
                    Unique Finds
                  </a>
                </div>
              )}
            </li>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
        </ul>
        
        <div className='flex items-center gap-6'>
          <a href="/cart">
            <ShoppingCart className='h-6 w-6' />
          </a>
          <button 
            className='relative flex items-center gap-1 hover:text-blue-700'
            onClick={handleProfileClick}
          >
            <UserCircle2Icon size={25}/>
            <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
            
            {isProfileOpen && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-lg shadow-lg p-2 z-50">
                <a href="/account" className="block px-4 py-2 hover:bg-gray-50 border border-gray-400 mb-2 rounded-xs ">
                  My Account
                </a>
                <a href="/orders" className="block px-4 py-2 hover:bg-gray-50 border border-gray-400 mb-2 rounded-xs ">
                  Order History
                </a>
                <a href="/logout" className="block px-4 py-2 hover:bg-gray-50 border border-gray-400 rounded-xs ">
                  Logout
                </a>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className='absolute top-full left-0 right-0 bg-white shadow-lg p-4 md:hidden'>
          <div className='relative flex items-center mb-4'>
            <Search className='absolute left-3 h-5 w-5 text-gray-400' />
            <input 
              type="text" 
              placeholder='Search Product or Brand here ....' 
              className='w-full pl-10 pr-4 py-2.5 rounded-full border border-gray-200 outline-none focus:border-blue-500'
            />
          </div>
          
          <ul className='space-y-4'>
            <li><a href="/" className='block text-blue-700'>Home</a></li>
            <li><a href="/about" className='block'>About</a></li>
            <li>
              <button 
                className='flex items-center gap-1 w-full'
                onClick={handleShopClick}
              >
                Shop
                <ChevronDown className={`h-4 w-4 transition-transform ${isShopOpen ? 'rotate-180' : ''}`} />
              </button>
              {isShopOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <a href="/new-arrival" className="block py-2 border border-gray-400 rounded-xs px-4">New Arrival</a>
                  <a href="/best-sellers" className="block py-2 border border-gray-400 rounded-xs px-4">Best Sellers</a>
                  <a href="/apparel" className="block py-2 border border-gray-400 rounded-xs px-4">Apparel</a>
                  <a href="/home-decor" className="block py-2 border border-gray-400 rounded-xs px-4">Home & Decor</a>
                  <a href="/tech-gadgets" className="block py-2 border border-gray-400 rounded-xs px-4">Tech & Gadgets</a>
                  <a href="/unique-finds" className="block py-2 border border-gray-400 rounded-xs px-4">Unique Finds</a>
                </div>
              )}
            </li>
            <li><a href="/contact" className='block'>Contact</a></li>
            <li><a href="/cart" className='block'>Cart</a></li>
            <li>
              <button 
                className='flex items-center gap-1 w-full'
                onClick={handleProfileClick}
              >
                Account
                <ChevronDown className={`h-4 w-4 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </button>
              {isProfileOpen && (
                <div className="pl-4 mt-2 space-y-2">
                  <a href="/account" className="block py-2 border border-gray-400 rounded-xs px-4">My Account</a>
                  <a href="/orders" className="block py-2 border border-gray-400 rounded-xs px-4">Order History</a>
                  <a href="/logout" className="block py-2 border border-gray-400 rounded-xs px-4">Logout</a>
                </div>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar