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

// Use ONLY columns proven to exist in the basic schema
const products = [
  {
    name: 'NeoStream Pro Headphones',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000',
    price: 299.99,
    description: 'Experience immersive sound with active noise cancellation and 40-hour battery life.',
    category: 'Electronics'
  },
  {
    name: 'Luxe Chrono Watch',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000',
    price: 189.50,
    description: 'A timeless masterpiece featuring sapphire crystal and premium leather strap.',
    category: 'Accessories'
  },
  {
    name: 'AeroLight Running Shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000',
    price: 120.00,
    description: 'Designed for speed and comfort with breathable mesh and responsive cushioning.',
    category: 'Footwear'
  },
  {
    name: 'SmartHome Central Hub',
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1000',
    price: 149.99,
    description: 'Control your entire home with your voice. Compatible with over 50,000 devices.',
    category: 'Electronics'
  },
  {
    name: 'Minimalist Leather Wallet',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000',
    price: 45.00,
    description: 'Slim profile wallet crafted from genuine Italian leather. RFID blocking included.',
    category: 'Accessories'
  },
  {
    name: 'ZenPad Mechanical Keyboard',
    image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?q=80&w=1000',
    price: 159.00,
    description: 'Ultra-responsive mechanical switches with customizable RGB lighting.',
    category: 'Electronics'
  },
  {
    name: 'HydroGen Water Bottle',
    image: 'https://images.unsplash.com/photo-1602143399827-bd934d883be7?q=80&w=1000',
    price: 35.00,
    description: 'Double-walled vacuum insulated stainless steel bottle. Keeps drinks cold for 24 hours.',
    category: 'Lifestyle'
  },
  {
    name: 'PixelPerfect Camera Lens',
    image: 'https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=1000',
    price: 899.00,
    description: 'Professional grade 50mm f/1.4 lens for stunning portraits and bokeh.',
    category: 'Photography'
  }
];

const importData = async () => {
  try {
    console.log('Inserting products into Supabase...');

    const { error: insertError } = await supabase.from('products').insert(products);
    if (insertError) {
        console.error('Insert Error Detail:', insertError);
        throw insertError;
    }

    console.log('Success: 8 products added to the products page.');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

importData();
