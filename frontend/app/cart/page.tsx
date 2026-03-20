'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, CreditCard } from 'lucide-react';

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
  };

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-gradient">Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="glass-panel text-center py-16 rounded-3xl">
          <h2 className="text-2xl text-white mb-4">Your cart is completely empty.</h2>
          <Link href="/products" className="text-primary-500 hover:underline">
            Go back to the catalog
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <div key={item.product} className="glass-panel p-4 rounded-xl flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.name}</h3>
                    <p className="text-gray-400">Qty: {item.qty}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <span className="text-xl font-bold text-white">${(item.price * item.qty).toFixed(2)}</span>
                  <button 
                    onClick={() => removeFromCart(item.product)}
                    className="text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="glass-panel p-6 rounded-3xl h-fit">
            <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
            <div className="flex justify-between border-b border-white/10 pb-4 mb-4 text-gray-300">
              <span>Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items)</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            
            <button className="w-full flex items-center justify-center py-4 rounded-xl font-bold text-white bg-primary-600 hover:bg-primary-500 transition-colors">
              <CreditCard className="mr-2" />
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
