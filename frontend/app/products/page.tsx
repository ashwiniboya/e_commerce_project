import Link from 'next/link';
export const dynamic = "force-dynamic";

// Helper to fetch data
async function getProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://e-commerce-project-o0bq.onrender.com/api';
  try {
    const res = await fetch(`${apiUrl}/products`, {
      cache: 'no-store', // Always fetch latest products
    });

    if (!res.ok) {
      throw new Error('Failed to fetch products');
    }

    return res.json();
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-gradient">Latest Products</h1>

      {products.length === 0 ? (
        <div className="text-gray-400">No products found. Please ensure the backend is running and database is seeded.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products?.map((product: any) => (
            <Link href={`/products/${product.id || product._id}`} key={product.id || product._id} className="group block">
              <div className="glass-panel rounded-2xl overflow-hidden transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.3)]">
                <div className="aspect-[4/3] bg-dark-800 flex items-center justify-center relative overflow-hidden group">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 to-transparent opacity-80" />
                </div>

                <div className="p-5">
                  <p className="text-sm text-primary-500 font-medium mb-1">{product.category}</p>
                  <h3 className="text-lg font-semibold text-white mb-2 line-clamp-1 group-hover:text-primary-400 transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xl font-bold text-white">${product.price.toFixed(2)}</span>
                    <span className="text-sm text-gray-400">{product.rating} ★</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
