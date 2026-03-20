'use client';

import { ShoppingCart, Zap } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ActionButtons({ product }: { product: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    // Basic LocalStorage Cart logic
    const existingCart = JSON.parse(localStorage.getItem('luxecart_items') || '[]');
    const itemExists = existingCart.find((x: any) => x.product === (product.id || product._id));
    
    if (itemExists) {
      itemExists.qty += 1;
    } else {
      existingCart.push({
        product: product.id || product._id,
        name: product.name,
        image: product.images[0],
        price: product.price,
        qty: 1,
      });
    }
    
    localStorage.setItem('luxecart_items', JSON.stringify(existingCart));
    router.push('/cart');
  };

  const handleOrderNow = async () => {
    setLoading(true);
    try {
      // Create Database Order instantly
      const res = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderItems: [{
            name: product.name,
            qty: 1,
            image: product.images[0],
            price: product.price,
            product: product.id || product._id
          }],
          shippingAddress: { address: 'Express Lane 1', city: 'Fastville', postalCode: '00000', country: 'US' },
          paymentMethod: 'Credit Card',
          itemsPrice: product.price,
          taxPrice: product.price * 0.1,
          shippingPrice: 0,
          totalPrice: product.price * 1.1
        })
      });

      const data = await res.json();
      
      if (res.ok) {
        router.push(`/order/${data.id || data._id}`);
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      alert('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <button 
        onClick={handleAddToCart}
        disabled={product.stock === 0}
        className={`flex-1 flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
          product.stock > 0 
            ? 'glass-panel text-white hover:bg-white/10 hover:shadow-lg hover:-translate-y-1' 
            : 'bg-dark-700 text-gray-500 cursor-not-allowed'
        }`}
      >
        <ShoppingCart className="w-5 h-5 mr-3" />
        Add to Cart
      </button>

      <button 
        onClick={handleOrderNow}
        disabled={product.stock === 0 || loading}
        className={`flex-1 flex items-center justify-center py-4 px-8 rounded-xl font-bold text-lg transition-all duration-300 ${
          product.stock > 0 && !loading
            ? 'bg-primary-600 text-white hover:bg-primary-500 hover:shadow-[0_0_20px_rgba(20,184,166,0.5)] hover:-translate-y-1' 
            : 'bg-primary-900 text-gray-400 cursor-not-allowed'
        }`}
      >
        <Zap className="w-5 h-5 mr-3 fill-current" />
        {loading ? 'Processing...' : 'Order Now'}
      </button>
    </div>
  );
}
