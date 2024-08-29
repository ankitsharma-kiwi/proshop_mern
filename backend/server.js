import express from 'express';
import connectDB from './config/db.js';
import productRoutes from './routes/products.route.js'
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
dotenv.config();
const dbUrl = process.env.MONGO_URI
connectDB(dbUrl);
const port = process.env.PORT || 5000;

const app = express();

app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
