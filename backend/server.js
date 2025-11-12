import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { connectDB } from './config/db.js'; // your MongoDB connection
import productRoutes from './routes/product.route.js';
import path from 'path';
import next from 'next';

dotenv.config();

const dev = process.env.NODE_ENV !== 'production';
const appNext = next({ dev, dir: path.join(path.resolve(), 'frontend') });
const handle = appNext.getRequestHandler();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ origin: dev ? 'http://localhost:3000' : 'https://product-store-zgez.onrender.com/', credentials: true }));
app.use(express.json());

// API routes
app.use('/api/products', productRoutes);

// Connect DB and start server
connectDB()
  .then(() => appNext.prepare())
  .then(() => {
// After all API routes
app.use((req, res) => handle(req, res));



    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Server failed to start:', err);
  });
