'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Zap, Plus, Minus, Star, ShieldCheck, Truck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ActionButtons({ product }: { product: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [qty, setQty] = useState(1);

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem('luxecart_items') || '[]');
    const itemExists = existingCart.find((x: any) => x.product === (product.id || product._id));
    
    if (itemExists) {
      itemExists.qty += qty;
    } else {
      existingCart.push({
        product: product.id || product._id,
        name: product.name,
        image: product.image || product.images?.[0] || 'https://via.placeholder.com/400',
        price: product.price,
        qty: qty,
      });
    }
    
    localStorage.setItem('luxecart_items', JSON.stringify(existingCart));
    window.dispatchEvent(new Event('storage'));
    router.push('/cart');
  };

  const handleBuyNow = () => {
    // Clear cart or just proceed with this item
    const singleOrderItem = [{
        product: product.id || product._id,
        name: product.name,
        image: product.image || product.images?.[0] || 'https://via.placeholder.com/400',
        price: product.price,
        qty: qty,
    }];
    localStorage.setItem('temp_checkout_items', JSON.stringify(singleOrderItem));
    router.push('/checkout');
  };

  return (
    <div className="space-y-8">
      {/* Quantity Selector */}
      <div className="flex items-center gap-6">
        <span className="text-gray-400 font-bold uppercase tracking-widest text-xs">Quantity</span>
        <div className="flex items-center bg-white/5 rounded-2xl p-1 border border-white/10 backdrop-blur-sm">
          <button 
            onClick={() => setQty(Math.max(1, qty - 1))}
            className="p-3 text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <Minus size={18} />
          </button>
          <input 
            type="number" 
            value={qty} 
            readOnly 
            className="bg-transparent text-center w-12 text-white font-black text-lg focus:outline-none" 
          />
          <button 
           onClick={() => setQty(qty + 1)}
           className="p-3 text-white hover:bg-white/10 rounded-xl transition-all"
          >
            <Plus size={18} />
          </button>
        </div>
        <span className="text-xs text-gray-500 font-bold">
          {product.stock > 0 ? `${product.stock} units available` : 'Out of Stock'}
        </span>
      </div>

      {/* Main Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className={`flex-1 flex items-center justify-center py-5 px-8 rounded-2xl font-black text-lg transition-all duration-300 ${
            product.stock > 0 
              ? 'glass-panel text-white hover:bg-white/10 hover:shadow-2xl hover:-translate-y-1 border border-white/10' 
              : 'bg-dark-800 text-gray-600 cursor-not-allowed border border-white/5'
          }`}
        >
          <ShoppingCart className="w-6 h-6 mr-3" />
          Add to Cart
        </motion.button>

        <motion.button 
          whileTap={{ scale: 0.95 }}
          onClick={handleBuyNow}
          disabled={product.stock === 0 || loading}
          className={`flex-1 flex items-center justify-center py-5 px-8 rounded-2xl font-black text-lg transition-all duration-300 ${
            product.stock > 0 && !loading
              ? 'bg-primary-600 text-white hover:bg-primary-500 hover:shadow-[0_0_40px_rgba(20,184,166,0.5)] hover:-translate-y-1' 
              : 'bg-primary-950 text-gray-500 cursor-not-allowed'
          }`}
        >
          <Zap className="w-6 h-6 mr-3 fill-current" />
          {loading ? 'Processing...' : 'Buy Now'}
        </motion.button>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-4 pt-4">
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <ShieldCheck className="text-primary-500 w-6 h-6" />
              <div>
                  <p className="text-white text-xs font-bold uppercase tracking-tighter">Secure Payment</p>
                  <p className="text-gray-500 text-[10px]">100% encryption</p>
              </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
              <Truck className="text-primary-500 w-6 h-6" />
              <div>
                  <p className="text-white text-xs font-bold uppercase tracking-tighter">Fast Delivery</p>
                  <p className="text-gray-500 text-[10px]">Express Shipping</p>
              </div>
          </div>
      </div>
    </div>
  );
}
