'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Eye, Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }: { product: any }) {
  const router = useRouter();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const existingCart = JSON.parse(localStorage.getItem('luxecart_items') || '[]');
    const itemExists = existingCart.find((x: any) => x.product === (product.id || product._id));
    
    if (itemExists) {
      itemExists.qty += 1;
    } else {
      existingCart.push({
        product: product.id || product._id,
        name: product.name,
        image: product.image || product.images?.[0] || 'https://via.placeholder.com/400',
        price: product.price,
        qty: 1,
      });
    }
    
    localStorage.setItem('luxecart_items', JSON.stringify(existingCart));
    // Trigger a storage event for the navbar to update
    window.dispatchEvent(new Event('storage'));
    router.push('/cart');
  };

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
      className="group relative glass-panel rounded-3xl overflow-hidden transition-all duration-500 hover:shadow-[0_20px_50px_rgba(20,184,166,0.2)] border border-white/5"
    >
      <Link href={`/products/${product.id || product._id}`} className="block">
        {/* Image Container */}
        <div className="aspect-[4/3] relative overflow-hidden bg-dark-800">
          <img
            src={product.image || product.images?.[0] || 'https://via.placeholder.com/400'}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
          
          {/* Category Chip */}
          <div className="absolute top-4 left-4 z-10">
            <span className="bg-dark-900/60 backdrop-blur-md text-primary-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border border-primary-500/20">
              {product.category || 'Collection'}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex justify-between items-start mb-3">
            <h3 className="text-lg font-bold text-white group-hover:text-primary-400 transition-colors line-clamp-1 leading-tight">
              {product.name}
            </h3>
            <div className="flex items-center text-yellow-400 font-bold text-xs bg-yellow-400/10 px-2 py-1 rounded-lg">
              <Star size={12} className="fill-current mr-1" />
              {product.rating || '4.5'}
            </div>
          </div>
          
          <p className="text-gray-400 text-sm line-clamp-2 mb-6 h-10 leading-relaxed">
            {product.description || 'Premium design meets exceptional quality in this exclusive collection.'}
          </p>

          <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/5">
            <div className="flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-widest font-bold">Price</span>
              <span className="text-2xl font-black text-white">${(product.price || 0).toFixed(2)}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={handleAddToCart}
                className="p-3 rounded-2xl bg-primary-600 text-white hover:bg-primary-500 hover:shadow-[0_0_20px_rgba(20,184,166,0.4)] transition-all active:scale-95"
                title="Add to Cart"
              >
                <ShoppingCart size={20} />
              </button>
              <div
                className="p-3 rounded-2xl bg-white/5 text-white hover:bg-white/10 transition-all border border-white/10"
                title="View Details"
              >
                <Eye size={20} />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
