'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, User, Search, Menu, X, ShoppingBag as ShoppingBagIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();

  const updateCartCount = () => {
    const items = JSON.parse(localStorage.getItem('luxecart_items') || '[]');
    const count = items.reduce((acc: number, item: any) => acc + (item.qty || 1), 0);
    setCartCount(count);
  };

  useEffect(() => {
    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  // Also update when pathname changes (simulating navigation end)
  useEffect(() => {
    updateCartCount();
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'Categories', href: '/categories' },
    { name: 'Featured', href: '#featured' },
  ];

  return (
    <nav className="fixed w-full z-[100] top-0 start-0 border-b border-white/5 bg-dark-950/80 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <motion.div 
               whileHover={{ scale: 1.05 }}
               className="w-10 h-10 bg-gradient-to-tr from-primary-600 to-indigo-600 rounded-xl flex items-center justify-center mr-3 shadow-lg shadow-primary-500/20"
            >
              <ShoppingBagIcon className="text-white w-6 h-6" />
            </motion.div>
            <span className="text-2xl font-black text-white tracking-tighter text-glow group-hover:text-primary-400 transition-colors">
              Luxe<span className="text-primary-500">Cart.</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`px-5 py-2 rounded-xl text-sm font-bold transition-all ${
                  pathname === link.href 
                    ? 'text-white bg-white/10 ring-1 ring-white/10' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2">
            <button className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all hidden sm:flex">
              <Search size={22} className="stroke-[2.5]" />
            </button>
            
            <Link 
              href="/cart" 
              className="relative p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all group"
            >
              <ShoppingCart size={22} className="stroke-[2.5]" />
              {cartCount > 0 && (
                <motion.span 
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  key={cartCount}
                  className="absolute top-1 right-1 bg-primary-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full shadow-lg shadow-primary-500/30 border-2 border-dark-950"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>

            <Link href="/login" className="p-3 text-gray-400 hover:text-white hover:bg-white/5 rounded-2xl transition-all hidden sm:flex">
                <User size={22} className="stroke-[2.5]" />
            </Link>

            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-3 text-white hover:bg-white/5 rounded-2xl transition-all"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-dark-950/60 backdrop-blur-sm z-[150] lg:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[300px] bg-dark-900 border-l border-white/5 z-[200] lg:hidden shadow-2xl p-8"
            >
              <div className="flex flex-col space-y-6 pt-12">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-2xl font-black text-white hover:text-primary-500 transition-colors tracking-tighter"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="h-px bg-white/5 my-8" />
                <Link href="/login" className="flex items-center text-gray-400 font-bold hover:text-white">
                    <User className="mr-3" /> Profile
                </Link>
                <Link href="/cart" className="flex items-center text-gray-400 font-bold hover:text-white">
                    <ShoppingCart className="mr-3" /> My Cart
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

function ShoppingBagIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
    )
}
