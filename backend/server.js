import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';            // ✅ import cors
import { connectDB } from './config/db.js';
import productRoutes from './routes/product.route.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS (allow frontend to access backend)
app.use(cors({
  origin: 'http://localhost:3000', // your Next.js frontend
  credentials: true,               // if you plan to send cookies or auth headers
}));

app.use(express.json()); // allows us to accept JSON data in req body 

// ✅ Routes
app.use('/api/products', productRoutes);

// ✅ Start server & connect to DB
app.listen(PORT, () => {
  connectDB();
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
