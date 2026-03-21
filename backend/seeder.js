import dotenv from 'dotenv';
import users from './data/users.js';
import products from './data/products.js';
import { supabase } from './config/db.js';

dotenv.config();

const importData = async () => {
  try {
    // Delete existing data (Cascade deletes may be needed depending on FK setup)
    await supabase.from('orders').delete().neq('id', 0);
    await supabase.from('products').delete().neq('id', 0);
    await supabase.from('users').delete().neq('id', 0);

    const { data: createdUsers, error: userError } = await supabase
      .from('users')
      .insert(users)
      .select();

    if (userError) throw userError;

    const adminUser = createdUsers[0].id;

    const sampleProducts = products.map((product) => {
      // make sure that image array is stringified if column is jsonb or string[], depends on DB setup. 
      return { ...product, user_id: adminUser };
    });

    const { error: prodError } = await supabase.from('products').insert(sampleProducts);
    
    if (prodError) throw prodError;

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await supabase.from('orders').delete().neq('id', 0);
    await supabase.from('products').delete().neq('id', 0);
    await supabase.from('users').delete().neq('id', 0);

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
