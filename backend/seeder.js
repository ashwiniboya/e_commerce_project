import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Please provide SUPABASE_URL and SUPABASE_ANON_KEY in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const products = [
  {
    name: 'NeoStream Pro Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    price: 299.99,
    description: 'Experience immersive sound with active noise cancellation and 40-hour battery life.',
    rating: 4.8,
    category: 'Electronics',
    stock: 15
  },
  {
    name: 'Luxe Chrono Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
    price: 189.50,
    description: 'A timeless masterpiece featuring sapphire crystal and premium leather strap.',
    rating: 4.6,
    category: 'Accessories',
    stock: 10
  },
  {
    name: 'AeroLight Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
    price: 120.00,
    description: 'Designed for speed and comfort with breathable mesh and responsive cushioning.',
    rating: 4.5,
    category: 'Footwear',
    stock: 25
  },
  {
    name: 'SmartHome Central Hub',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000',
    price: 149.99,
    description: 'Control your entire home with your voice. Compatible with over 50,000 devices.',
    rating: 4.7,
    category: 'Electronics',
    stock: 20
  },
  {
    name: 'Minimalist Leather Wallet',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000',
    price: 45.00,
    description: 'Slim profile wallet crafted from genuine Italian leather. RFID blocking included.',
    rating: 4.9,
    category: 'Accessories',
    stock: 50
  },
  {
    name: 'ZenPad Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000',
    price: 159.00,
    description: 'Ultra-responsive mechanical switches with customizable RGB lighting.',
    rating: 4.7,
    category: 'Electronics',
    stock: 8
  },
  {
    name: 'HydroGen Water Bottle',
    image: 'https://images.unsplash.com/photo-1602143399827-bd934d883be7?q=80&w=1000',
    price: 35.00,
    description: 'Double-walled vacuum insulated stainless steel bottle. Keeps drinks cold for 24 hours.',
    rating: 4.4,
    category: 'Lifestyle',
    stock: 100
  },
  {
    name: 'PixelPerfect Camera Lens',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1000',
    price: 899.00,
    description: 'Professional grade 50mm f/1.4 lens for stunning portraits and bokeh.',
    rating: 4.9,
    category: 'Photography',
    stock: 5
  },
  {
    name: 'CloudWalk Yoga Mat',
    image: 'https://images.unsplash.com/photo-1592432676556-26d1be2729af?q=80&w=1000',
    price: 65.00,
    description: 'Extra thick, non-slip yoga mat for maximum support during your practice.',
    rating: 4.6,
    category: 'Fitness',
    stock: 30
  },
  {
    name: 'Voyager Anti-Theft Backpack',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000',
    price: 110.00,
    description: 'Travel securely with hidden zippers and cut-proof material. USB charging port included.',
    rating: 4.7,
    category: 'Travel',
    stock: 18
  },
  {
    name: 'SonicWave Electric Toothbrush',
    image: 'https://images.unsplash.com/photo-1559613684-48ff214409c7?q=80&w=1000',
    price: 89.99,
    description: 'Achieve a brighter smile with 40,000 vibrations per minute and 5 cleaning modes.',
    rating: 4.5,
    category: 'Personal Care',
    stock: 40
  },
  {
    name: 'Precision Chef Knife',
    image: 'https://images.unsplash.com/photo-1593611664162-97b1ad5cc11e?q=80&w=1000',
    price: 75.00,
    description: 'High-carbon stainless steel blade with ergonomic handle for professional slicing.',
    rating: 4.8,
    category: 'Kitchen',
    stock: 22
  },
  {
    name: 'InfiniteLoop Wireless Charger',
    image: 'https://images.unsplash.com/photo-1586816832791-221230f7d0d0?q=80&w=1000',
    price: 49.00,
    description: 'Fast 15W wireless charging for all Qi-enabled devices. Sleek aluminum finish.',
    rating: 4.3,
    category: 'Electronics',
    stock: 60
  },
  {
    name: 'PureAir Desktop Purifier',
    image: 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?q=80&w=1000',
    price: 129.00,
    description: 'HEPA filter removes 99.9% of airborne particles. Perfect for office or bedroom.',
    rating: 4.6,
    category: 'Home',
    stock: 12
  },
  {
    name: 'Titanium Multi-Tool',
    image: 'https://images.unsplash.com/photo-1586864387917-f5814902bb91?q=80&w=1000',
    price: 55.00,
    description: '18 tools in one compact design. Crafted from lightweight, aerospace-grade titanium.',
    rating: 4.7,
    category: 'Outdoor',
    stock: 35
  },
  {
    name: 'FocusFlow Desk Lamp',
    image: 'https://images.unsplash.com/photo-1534073828943-f801091bb18c?q=80&w=1000',
    price: 79.99,
    description: 'Eye-care LED technology with adjustable brightness and color temperature.',
    rating: 4.5,
    category: 'Office',
    stock: 25
  },
  {
    name: 'Summit Series Tent',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?q=80&w=1000',
    price: 349.00,
    description: '4-person all-weather tent with easy setup and superior ventilation.',
    rating: 4.8,
    category: 'Outdoor',
    stock: 7
  },
  {
    name: 'Barista Grade Espresso Machine',
    image: 'https://images.unsplash.com/photo-1510520434124-5bc7e642b61d?q=80&w=1000',
    price: 1200.00,
    description: 'Make perfect lattes at home with precise temperature control and powerful steam wand.',
    rating: 4.9,
    category: 'Kitchen',
    stock: 3
  },
  {
    name: 'EcoRide Electric Scooter',
    image: 'https://images.unsplash.com/photo-1605332763695-97e937d10e53?q=80&w=1000',
    price: 499.00,
    description: 'Commute efficiently with 25 mile range and 18 mph top speed. Foldable design.',
    rating: 4.4,
    category: 'Transport',
    stock: 10
  },
  {
    name: 'AquaPulse Smart Watch',
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?q=80&w=1000',
    price: 249.00,
    description: 'Advanced fitness tracking with waterproof design up to 50 meters.',
    rating: 4.7,
    category: 'Electronics',
    stock: 15
  },
  {
    name: 'CrystalClear Bluetooth Speaker',
    image: 'https://images.unsplash.com/photo-1608156639585-34a0a56ee11b?q=80&w=1000',
    price: 129.99,
    description: '360-degree sound with deep bass and IPX7 waterproof rating.',
    rating: 4.6,
    category: 'Electronics',
    stock: 20
  }
];

const importData = async () => {
  try {
    // Delete all existing products first
    const { error: deleteError } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (deleteError) throw deleteError;

    console.log('Data Destroyed!');

    const { error: insertError } = await supabase.from('products').insert(products);
    if (insertError) throw insertError;

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    const { error } = await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
