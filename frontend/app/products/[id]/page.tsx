import dynamic from 'next/dynamic';
const ThreeDModel = dynamic(() => import('@/components/ThreeDModel'), { ssr: false });
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ActionButtons from '@/components/ActionButtons';

async function getProduct(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  try {
    const res = await fetch(`${apiUrl}/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!res.ok) {
      return null;
    }
    
    return res.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

export default async function ProductDetailsPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <Link href="/products" className="text-primary-500 hover:text-primary-400">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link href="/products" className="inline-flex items-center text-sm text-gray-400 hover:text-primary-500 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Results
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left column - 3D Viewer */}
        <div className="glass-panel rounded-3xl overflow-hidden p-2 relative group">
          <div className="absolute top-4 right-4 z-10 bg-dark-900/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs font-medium text-gray-300 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
            Interactive 3D View
          </div>
          <ThreeDModel />
        </div>

        {/* Right column - Product Details */}
        <div className="flex flex-col justify-center">
          <div className="mb-2 text-primary-500 font-semibold tracking-wide uppercase text-sm">
            {product.category}
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            {product.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center bg-white/5 rounded-full px-3 py-1 border border-white/10">
              <span className="text-yellow-400 mr-1">★</span>
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-gray-400 text-sm ml-2">({product.numReviews} reviews)</span>
            </div>
            
            {product.stock > 0 ? (
              <span className="text-green-400 font-medium text-sm">In Stock</span>
            ) : (
              <span className="text-red-400 font-medium text-sm">Out of Stock</span>
            )}
          </div>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {product.description}
          </p>

          <div className="border-t border-white/10 pt-8 pb-6 mb-6">
            <div className="text-4xl font-bold text-white mb-2">
              ${product.price.toFixed(2)}
            </div>
            <p className="text-gray-400 text-sm">Includes taxes and shipping limits where applicable.</p>
          </div>

          <ActionButtons product={product} />
        </div>
      </div>
    </div>
  );
}
