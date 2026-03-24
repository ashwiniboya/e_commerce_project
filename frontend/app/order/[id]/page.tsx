import { Truck, CheckCircle, Package, Clock } from 'lucide-react';
import Link from 'next/link';

// Helper to fetch server-side order
async function getOrder(id: string) {
  try {
    const res = await fetch(`https://e-commerce-project-o0bq.onrender.com/api/orders/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    return null;
  }
}

export default async function OrderTracePage({ params }: { params: { id: string } }) {
  const order = await getOrder(params.id);

  if (!order) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center text-white">
        <h1 className="text-3xl font-bold mb-4 text-red-400">Order Not Found</h1>
        <p>Ensure the backend is running!</p>
      </div>
    );
  }

  // Calculate dynamic delivery date (3 days from order creation)
  const orderDate = new Date(order.createdAt || order.created_at || new Date());
  const deliveryDate = new Date(orderDate);
  deliveryDate.setDate(orderDate.getDate() + 3);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12">
      <div className="glass-panel rounded-3xl p-8 shadow-2xl overflow-hidden relative">
        {/* Success Header Label */}
        <div className="absolute top-0 right-0 bg-green-500/20 text-green-400 px-4 py-2 rounded-bl-3xl font-bold text-sm tracking-widest border-b border-l border-green-500/30 backdrop-blur-md">
          ORDER SUCCESSFUL
        </div>

        <h1 className="text-3xl font-bold text-white mb-2 text-gradient">Order Tracing</h1>
        <p className="text-gray-400 mb-8 font-mono text-sm">ID: {order.id || order._id}</p>

  const statusSteps = [
    { name: 'Placed', icon: CheckCircle, status: 'Placed' },
    { name: 'Processing', icon: Package, status: 'Processing' },
    { name: 'Shipped', icon: Truck, status: 'Shipped' },
    { name: 'Out for Delivery', icon: Truck, status: 'Out for Delivery' },
    { name: 'Delivered', icon: CheckCircle, status: 'Delivered' },
  ];

  const currentStatusIndex = statusSteps.findIndex(s => s.status === order.status) !== -1 
    ? statusSteps.findIndex(s => s.status === order.status) 
    : 0;

  return (
    <div className="min-h-screen bg-dark-950 pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="glass-panel rounded-[3rem] p-10 shadow-2xl relative border border-white/5 overflow-hidden">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
            <div>
               <h1 className="text-4xl font-black text-white mb-2 tracking-tighter text-glow">
                 Track your <span className="text-gradient">Order.</span>
               </h1>
               <p className="text-gray-500 font-mono text-xs uppercase tracking-widest bg-white/5 w-fit px-3 py-1 rounded-lg">
                 Order ID: #{order.id || order._id}
               </p>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 text-green-400 px-6 py-3 rounded-2xl flex items-center gap-3">
              <CheckCircle size={20} className="animate-pulse" />
              <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold tracking-widest">Status</span>
                  <span className="text-sm font-black uppercase">{order.status || 'Confirmed'}</span>
              </div>
            </div>
          </div>

          {/* New Progress Bar UI */}
          <div className="mb-16">
            <div className="relative flex justify-between">
              {/* Background Line */}
              <div className="absolute top-6 left-0 w-full h-1 bg-white/5 -z-10 rounded-full" />
              {/* Active Line */}
              <div 
                className="absolute top-6 left-0 h-1 bg-gradient-to-r from-primary-600 to-indigo-600 -z-10 rounded-full transition-all duration-1000 shadow-[0_0_20px_rgba(20,184,166,0.5)]" 
                style={{ width: `${(currentStatusIndex / (statusSteps.length - 1)) * 100}%` }}
              />

              {statusSteps.map((step, idx) => {
                const Icon = step.icon;
                const isCompleted = idx <= currentStatusIndex;
                const isActive = idx === currentStatusIndex;

                return (
                  <div key={idx} className="flex flex-col items-center">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                       isCompleted ? 'bg-primary-600 shadow-lg shadow-primary-500/20 text-white' : 'bg-dark-800 text-gray-600 border border-white/5'
                    } ${isActive ? 'ring-4 ring-primary-500/30 scale-110' : ''}`}>
                      <Icon size={20} className={isActive ? 'animate-bounce' : ''} />
                    </div>
                    <span className={`text-[10px] font-black uppercase tracking-tighter mt-4 transition-colors ${
                      isCompleted ? 'text-white' : 'text-gray-600'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Estimation Box */}
          <div className="bg-primary-500/5 rounded-3xl p-8 border border-primary-500/10 mb-12 flex flex-col sm:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-primary-600/20 rounded-2xl flex items-center justify-center shrink-0">
               <Truck className="text-primary-500 w-10 h-10" />
            </div>
            <div>
               <h3 className="text-xl font-bold text-white mb-2">Ready for Express Delivery</h3>
               <p className="text-gray-400 mb-4 leading-relaxed max-w-md">Our logistics partner has received your package. It's on track to arrive safely at your doorstep.</p>
               <div className="flex items-center gap-3 text-sm font-bold text-primary-400 bg-primary-500/10 w-fit px-4 py-2 rounded-xl">
                  <Clock size={16} />
                  Arriving in 3-5 days
               </div>
            </div>
          </div>

        {/* Order Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Shipping Information</h3>
            <p className="text-gray-300">{order.shippingAddress?.address || order.shipping_address?.address}</p>
            <p className="text-gray-300">{order.shippingAddress?.city || order.shipping_address?.city}, {order.shippingAddress?.postalCode || order.shipping_address?.postalCode}</p>
            <p className="text-gray-300">{order.shippingAddress?.country || order.shipping_address?.country}</p>
          </div>
          <div>
            <h3 className="text-lg font-bold text-white mb-4 border-b border-white/10 pb-2">Payment Details</h3>
            <p className="text-gray-300 mb-1">Method: {order.paymentMethod || order.payment_method}</p>
            <p className="text-gray-300 font-bold text-lg text-primary-400">Total Charged: ${(order.totalPrice || order.total_price || 0).toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-8 text-center pt-8 border-t border-white/10">
          <Link href="/products" className="py-3 px-8 rounded-xl font-bold bg-white text-dark-900 hover:bg-gray-200 transition-colors">
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
}
