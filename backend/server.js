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

// Allowed origins
const allowedOrigins = [
  'http://localhost:3000',                   // dev frontend
  'https://product-store-zgez.onrender.com', // admin site
  'https://u-product-store-zgez.onrender.com/'// user-facing site
];

// Middleware
app.use(cors({
  origin: function(origin, callback){
    if (!origin) return callback(null, true); // allow server-to-server or Postman requests
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the specified Origin.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use(express.json());

// API routes
app.use('/api/products', productRoutes);

// Connect DB and start server
connectDB()
  .then(() => appNext.prepare())
  .then(() => {
    // Next.js frontend handler
    app.use((req, res) => handle(req, res));

    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Server failed to start:', err);
  });
