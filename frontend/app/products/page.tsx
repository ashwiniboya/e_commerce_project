'use client';

import { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { motion } from 'framer-motion';

// Helper to fetch data
async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-project-o0bq.onrender.com/api';
  try {
    const res = await fetch(`${apiUrl}/products`, {
      next: { revalidate: 0 },
    });
    if (!res.ok) throw new Error('Failed to fetch products');
    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts().then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary-500/20 border-t-primary-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6"
        >
          <div className="max-w-2xl">
            <h1 className="text-5xl font-black text-white mb-4 tracking-tighter text-glow">
              Elevate Your <span className="text-gradient">Style.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Explore our curated selection of ultra-premium digital and lifestyle goods. Designed for those who demand excellence.
            </p>
          </div>
          
          <div className="flex items-center gap-4 bg-white/5 p-2 rounded-2xl border border-white/10 backdrop-blur-sm self-start">
             <span className="text-sm font-bold text-gray-400 px-4">All Collections</span>
             <span className="bg-primary-600 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg ring-4 ring-primary-500/20">
               {products.length} Products Found
             </span>
          </div>
        </motion.div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="glass-panel p-20 text-center rounded-[3rem] border-dashed border-2 border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">No products found.</h2>
            <p className="text-gray-400">Please ensure the backend is running and database is seeded.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {products.map((product, index) => (
              <motion.div
                key={product.id || product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
