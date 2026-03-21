import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import supabase from "./config/supabase.js";


// Load environment variables
dotenv.config();

// Supabase client is initialized in config/db.js and used directly in controllers

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});
app.get("/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
});
app.post("/products", async (req, res) => {
  const { name, price, category } = req.body;

  const { data, error } = await supabase
    .from("products")
    .insert([{ name, price, category }]);

  if (error) {
    return res.status(500).json(error);
  }

  res.json({
    message: "Product added successfully",
    data: data
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));

