'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<any[]>([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem('luxecart_items') || '[]');
    setCartItems(items);
  }, []);

  const removeFromCart = (productId: string) => {
    const updated = cartItems.filter(item => item.product !== productId);
    setCartItems(updated);
    localStorage.setItem('luxecart_items', JSON.stringify(updated));
    window.dispatchEvent(new Event('storage'));
  };

  const updateQuantity = (productId: string, newQty: number) => {
    if (newQty < 1) return;
    const updated = cartItems.map(item => 
        item.product === productId ? { ...item, qty: newQty } : item
    );
    setCartItems(updated);
    localStorage.setItem('luxecart_items', JSON.stringify(updated));
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="mb-12">
            <h1 className="text-5xl font-black text-white tracking-tighter text-glow">
                Shopping <span className="text-gradient">Cart.</span>
            </h1>
        </header>
        
        {cartItems.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel text-center py-24 rounded-[3rem] border-dashed border-2 border-white/10"
          >
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <ShoppingBag size={48} className="text-gray-500" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Your collection is empty.</h2>
            <Link 
                href="/products" 
                className="inline-flex items-center py-4 px-10 rounded-2xl font-bold text-white bg-primary-600 hover:bg-primary-500 transition-all hover:scale-105"
            >
                Browse Collection <ArrowRight size={20} className="ml-2" />
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div 
                    key={item.product}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ delay: index * 0.1 }}
                    className="glass-panel p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between border border-white/5 hover:border-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-8 w-full">
                      <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0 bg-dark-800 shadow-2xl border border-white/5">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2 leading-tight">{item.name}</h3>
                        <p className="text-primary-500 font-bold mb-4">${item.price.toFixed(2)}</p>
                        
                        <div className="flex items-center bg-dark-900/50 rounded-xl p-1 border border-white/10 w-fit">
                            <button 
                                onClick={() => updateQuantity(item.product, item.qty - 1)}
                                className="px-3 text-white hover:bg-white/5 rounded-lg transition-colors"
                            > - </button>
                            <span className="px-4 text-white font-bold">{item.qty}</span>
                            <button 
                                onClick={() => updateQuantity(item.product, item.qty + 1)}
                                className="px-3 text-white hover:bg-white/5 rounded-lg transition-colors"
                            > + </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between sm:justify-end w-full sm:w-auto mt-6 sm:mt-0 sm:space-x-12">
                      <span className="text-2xl font-black text-white">${(item.price * item.qty).toFixed(2)}</span>
                      <button 
                        onClick={() => removeFromCart(item.product)}
                        className="p-4 rounded-2xl bg-white/5 text-red-500 hover:bg-red-500 hover:text-white transition-all transform active:scale-90"
                      >
                        <Trash2 size={24} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="lg:col-span-1">
              <div className="glass-panel p-8 rounded-[2.5rem] sticky top-32 border border-white/10 shadow-2xl">
                <h2 className="text-2xl font-black text-white mb-8 tracking-tighter">Order Overview</h2>
                
                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-gray-400 font-medium">
                        <span>Items Total</span>
                        <span className="text-white">${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-400 font-medium">
                        <span>Shipping</span>
                        <span className="text-green-400 uppercase text-xs font-black">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-400 font-medium">
                        <span>Estimated Tax</span>
                        <span className="text-white">$0.00</span>
                    </div>
                </div>

                <div className="pt-6 border-t border-white/10 mb-8">
                    <div className="flex justify-between items-end">
                        <span className="text-gray-400 font-bold">Total Amount</span>
                        <span className="text-4xl font-black text-white">${totalAmount.toFixed(2)}</span>
                    </div>
                </div>
                
                <Link 
                    href="/checkout"
                    className="w-full flex items-center justify-center py-5 rounded-2xl font-black text-white bg-primary-600 hover:bg-primary-500 transition-all hover:scale-105 shadow-[0_20px_40px_-5px_rgba(20,184,166,0.3)] shadow-glow"
                >
                    Checkout Securely
                    <ArrowRight className="ml-2" />
                </Link>

                <p className="mt-6 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
                    SSL Secured • Cash on Delivery
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
