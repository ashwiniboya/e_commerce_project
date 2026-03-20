'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ShoppingCart, User, Search, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full z-50 top-0 start-0 border-b border-white/10 glass-panel">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="self-center text-2xl font-bold whitespace-nowrap text-white text-gradient"
          >
            LuxeCart
          </motion.span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex md:order-1 items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-primary-500 transition-colors">Home</Link>
          <Link href="/products" className="text-gray-300 hover:text-primary-500 transition-colors">Products</Link>
          <Link href="/categories" className="text-gray-300 hover:text-primary-500 transition-colors">Categories</Link>
        </div>

        {/* Icons */}
        <div className="flex md:order-2 space-x-4 items-center">
          <button className="text-gray-300 hover:text-white transition-colors">
            <Search size={22} />
          </button>
          
          <Link href="/cart" className="relative text-gray-300 hover:text-white transition-colors group">
            <ShoppingCart size={22} />
            <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full group-hover:scale-110 transition-transform">
              3
            </span>
          </Link>

          <Link href="/login" className="text-gray-300 hover:text-white transition-colors hidden sm:block">
            <User size={22} />
          </Link>

          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-300 hover:text-white focus:outline-none"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden border-t border-white/10 bg-dark-900/95 backdrop-blur-md"
        >
          <ul className="flex flex-col p-4 space-y-4">
            <li>
              <Link href="/" className="block text-gray-300 hover:text-primary-500 transition-colors">Home</Link>
            </li>
            <li>
              <Link href="/products" className="block text-gray-300 hover:text-primary-500 transition-colors">Products</Link>
            </li>
            <li>
              <Link href="/categories" className="block text-gray-300 hover:text-primary-500 transition-colors">Categories</Link>
            </li>
            <li>
              <Link href="/login" className="block text-gray-300 hover:text-primary-500 transition-colors">Login</Link>
            </li>
          </ul>
        </motion.div>
      )}
    </nav>
  );
}
