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

        {/* Dynamic Trace Timeline Component */}
        <div className="bg-dark-800/50 rounded-2xl p-6 border border-white/10 mb-8">
          <h2 className="text-xl font-bold text-white mb-6">Delivery Status</h2>

          <div className="flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-dark-700 -z-10 -translate-y-1/2 rounded-full" />
            <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-primary-500 -z-10 -translate-y-1/2 rounded-full shadow-[0_0_10px_rgba(20,184,166,0.5)]" />

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center shadow-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-bold text-white mt-3">Placed</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center shadow-lg">
                <Package className="w-5 h-5 text-white" />
              </div>
              <p className="text-xs font-bold text-white mt-3">Packed</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-dark-700 border-2 border-primary-500 flex items-center justify-center animate-pulse">
                <Truck className="w-5 h-5 text-primary-400" />
              </div>
              <p className="text-xs font-bold text-primary-400 mt-3">Dispatched</p>
            </div>

            <div className="flex flex-col items-center opacity-40">
              <div className="w-10 h-10 rounded-full bg-dark-700 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-gray-500" />
              </div>
              <p className="text-xs font-bold text-gray-400 mt-3">Delivered</p>
            </div>
          </div>

          <div className="mt-8 bg-primary-500/10 border border-primary-500/20 rounded-xl p-4 flex items-center">
            <Clock className="text-primary-400 w-8 h-8 mr-4" />
            <div>
              <p className="text-primary-400 font-bold mb-1">Expected Delivery</p>
              <p className="text-white text-lg">Your items will arrive in <span className="text-primary-500 font-extrabold text-xl">3 Days</span> on {deliveryDate.toDateString()}</p>
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
