import dynamic from 'next/dynamic';
const ThreeDModel = dynamic(() => import('@/components/ThreeDModel'), { ssr: false });
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ActionButtons from '@/components/ActionButtons';

async function getProduct(id: string) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-project-o0bq.onrender.com/api';
  try {
    const res = await fetch(`${apiUrl}/products/${id}`, {
      next: { revalidate: 0 },
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
    <div className="min-h-screen bg-dark-950 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link href="/products" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-white mb-12 transition-colors group">
          <ArrowLeft className="w-5 h-5 mr-3 group-hover:-translate-x-2 transition-transform" />
          Back to the Collection
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 xl:gap-24">
          {/* Left column - 3D Viewer / Hero Image */}
          <div className="space-y-8">
            <div className="glass-panel rounded-[3rem] overflow-hidden p-2 relative group border border-white/5 shadow-2xl">
              <div className="absolute top-6 right-6 z-10 bg-dark-950/60 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/10 text-[10px] font-black uppercase tracking-widest text-primary-400 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse shadow-[0_0_10px_rgba(20,184,166,1)]" />
                Live 3D Preview
              </div>
              <div className="aspect-square bg-dark-900/50 rounded-[2.5rem] overflow-hidden">
                 <ThreeDModel />
              </div>
            </div>

            {/* Sub images or features */}
            <div className="grid grid-cols-3 gap-4">
                {[1,2,3].map(i => (
                    <div key={i} className="aspect-square glass-panel rounded-2xl border border-white/5 bg-dark-800 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                        <img src={product.image || 'https://via.placeholder.com/400'} className="w-full h-full object-cover rounded-2xl" />
                    </div>
                ))}
            </div>
          </div>

          {/* Right column - Product Details */}
          <div className="flex flex-col justify-center py-6">
            <div className="inline-block mb-6 px-4 py-1.5 rounded-full bg-primary-500/10 border border-primary-500/20 text-primary-500 font-black uppercase tracking-widest text-[10px]">
              {product.category || 'Premium Collection'}
            </div>
            
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-6 tracking-tighter text-glow leading-[1.05]">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-10">
              <div className="flex items-center bg-white/5 rounded-2xl px-4 py-2 border border-white/10 backdrop-blur-sm">
                <Star className="text-yellow-400 w-4 h-4 mr-2 fill-current" />
                <span className="text-white font-black text-sm">{product.rating || '4.5'}</span>
                <span className="text-gray-500 text-xs font-bold ml-3 border-l border-white/10 pl-3">({product.numReviews || '128'} reviews)</span>
              </div>
              
              <div className="h-2 w-2 rounded-full bg-white/10" />

              <div className="text-xs font-black uppercase tracking-widest">
                {(product.stock || 0) > 0 ? (
                  <span className="text-green-400">In Stock</span>
                ) : (
                  <span className="text-red-400/60">Out of Stock</span>
                )}
              </div>
            </div>

            <p className="text-gray-400 text-lg mb-12 leading-relaxed font-medium">
              {product.description || 'This premium item defines luxury with its meticulous craftsmanship and innovative design details. Perfect for those who appreciate the finer things in life.'}
            </p>

            <div className="mb-12">
              <div className="flex items-baseline gap-4 mb-2">
                <span className="text-6xl font-black text-white leading-none">${(product.price || 0).toFixed(2)}</span>
                <span className="text-gray-500 font-bold line-through text-xl">${((product.price || 0) * 1.2).toFixed(2)}</span>
              </div>
              <p className="text-gray-500 text-xs font-bold uppercase tracking-widest pl-1">Worldwide shipping + Instant tracking</p>
            </div>

            <ActionButtons product={product} />

            <div className="mt-12 pt-12 border-t border-white/5">
                <p className="text-gray-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4 text-center">Guaranteed by LuxeCart Global</p>
                <div className="flex justify-center gap-8 opacity-30">
                    {/* Placeholder for small icons/badges */}
                    <div className="w-8 h-8 bg-white rounded-full" />
                    <div className="w-8 h-8 bg-white rounded-full" />
                    <div className="w-8 h-8 bg-white rounded-full" />
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
