import Link from 'next/link';

export default function CategoriesPage() {
  const categories = [
    { name: 'Electronics', count: 124, image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80' },
    { name: 'Fashion & Apparel', count: 86, image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&q=80' },
    { name: 'Home & Kitchen', count: 210, image: 'https://images.unsplash.com/photo-1556910103-1c02745a8286?w=800&q=80' },
    { name: 'Sports & Outdoors', count: 54, image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=800&q=80' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-white mb-8 text-gradient">Shop by Category</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={`/products?category=${category.name}`} key={category.name} className="group block relative overflow-hidden rounded-2xl aspect-[4/5]">
            <img 
              src={category.image} 
              alt={category.name} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900/90 via-dark-900/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 p-6">
              <h3 className="text-2xl font-bold text-white mb-1 drop-shadow-lg">{category.name}</h3>
              <p className="text-gray-300 font-medium">{category.count} Products</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
