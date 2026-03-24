'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, CheckCircle, MapPin, Truck, CreditCard } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function CheckoutPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  
  const [address, setAddress] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United States'
  });

  useEffect(() => {
    // Check for temp checkout item first (Buy Now)
    const tempItem = localStorage.getItem('temp_checkout_items');
    if (tempItem) {
        setCartItems(JSON.parse(tempItem));
    } else {
        const items = JSON.parse(localStorage.getItem('luxecart_items') || '[]');
        setCartItems(items);
    }
  }, []);

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      orderItems: cartItems,
      shippingAddress: address,
      paymentMethod: 'Cash on Delivery',
      itemsPrice: totalAmount,
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: totalAmount,
    };

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-project-o0bq.onrender.com/api';
      const res = await fetch(`${apiUrl}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        // Clear cart if not buy now
        if (!localStorage.getItem('temp_checkout_items')) {
            localStorage.setItem('luxecart_items', '[]');
            window.dispatchEvent(new Event('storage'));
        }
        localStorage.removeItem('temp_checkout_items');
        router.push(`/order/${data.id || data._id}`);
      } else {
        alert(data.message || 'Order reduction failed');
      }
    } catch (error) {
      alert('Error connecting to backend');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0) {
      return (
        <div className="pt-32 text-center text-white">
            <h2 className="text-2xl font-bold">No items to checkout</h2>
            <Link href="/products" className="text-primary-500">Go to Products</Link>
        </div>
      );
  }

  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4">
        <Link href="/cart" className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors group">
          <ArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" size={20} />
          Back to Collection
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-8"
            >
                <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5">
                    <h2 className="text-3xl font-black text-white mb-8 tracking-tighter flex items-center">
                        <MapPin className="mr-3 text-primary-500" />
                        Delivery Info
                    </h2>
                    
                    <form onSubmit={handleSubmit} id="checkout-form" className="space-y-4 text-white">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Full Name</label>
                            <input 
                                required
                                value={address.name}
                                onChange={(e) => setAddress({...address, name: e.target.value})}
                                type="text" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary-500 focus:outline-none transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Shipping Address</label>
                            <input 
                                required
                                value={address.address}
                                onChange={(e) => setAddress({...address, address: e.target.value})}
                                type="text" 
                                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary-500 focus:outline-none transition-all"
                                placeholder="123 Luxury Ave, Suite 4"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">City</label>
                                <input 
                                    required
                                    value={address.city}
                                    onChange={(e) => setAddress({...address, city: e.target.value})}
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary-500 focus:outline-none transition-all"
                                    placeholder="New York"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-2">Zip Code</label>
                                <input 
                                    required
                                    value={address.postalCode}
                                    onChange={(e) => setAddress({...address, postalCode: e.target.value})}
                                    type="text" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:border-primary-500 focus:outline-none transition-all"
                                    placeholder="10001"
                                />
                            </div>
                        </div>
                    </form>
                </div>

                <div className="glass-panel p-8 rounded-[2.5rem] border border-white/5">
                    <h2 className="text-2xl font-black text-white mb-6 tracking-tighter flex items-center">
                        <CreditCard className="mr-3 text-primary-500" />
                        Payment Method
                    </h2>
                    <div className="p-4 rounded-2xl bg-primary-500/10 border border-primary-500/30 flex items-center justify-between">
                        <div className="flex items-center">
                            <CheckCircle className="text-primary-500 mr-3" />
                            <span className="text-white font-bold">Cash on Delivery</span>
                        </div>
                        <span className="text-[10px] bg-primary-600 text-white font-black px-2 py-1 rounded">DEFAULT</span>
                    </div>
                </div>
            </motion.div>

            {/* Summary */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
            >
                <div className="glass-panel p-8 rounded-[2.5rem] border border-white/10 sticky top-32">
                    <h2 className="text-2xl font-black text-white mb-8 tracking-tighter">Order Summary</h2>
                    
                    <div className="space-y-6 max-h-[300px] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                        {cartItems.map(item => (
                            <div key={item.product} className="flex items-center space-x-4">
                                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-dark-800">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-white text-sm font-bold line-clamp-1">{item.name}</p>
                                    <p className="text-gray-500 text-xs">Qty: {item.qty} × ${item.price}</p>
                                </div>
                                <span className="text-white font-bold">${(item.price * item.qty).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-3 pt-6 border-t border-white/10 mb-8">
                        <div className="flex justify-between text-gray-400">
                            <span>Subtotal</span>
                            <span className="text-white font-bold">${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-gray-400">
                            <span>Shipping</span>
                            <span className="text-green-400 font-bold uppercase text-[10px]">Free Express</span>
                        </div>
                        <div className="flex justify-between pt-4">
                            <span className="text-white font-black text-lg">Total</span>
                            <span className="text-white font-black text-3xl">${totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    <button 
                        form="checkout-form"
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center py-5 rounded-2xl font-black text-white bg-primary-600 hover:bg-primary-500 transition-all hover:scale-[1.02] shadow-[0_20px_40px_-5px_rgba(20,184,166,0.5)] disabled:opacity-50"
                    >
                        {loading ? 'Confirming Order...' : 'Confirm Order Now'}
                    </button>

                    <div className="mt-6 flex items-center justify-center gap-4 text-gray-500">
                        <Truck size={16} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">3-5 Days Guaranteed Delivery</span>
                    </div>
                </div>
            </motion.div>
        </div>
      </div>
    </div>
  );
}
