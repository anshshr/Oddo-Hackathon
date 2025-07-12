const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./db');
const cors = require("cors");

const app = express();
const authMiddleware = require("./middleware");


// 🔓 Allow all origins (default, for development)
app.use(cors());
dotenv.config();
connectDB(); // Connect to MongoDB
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/User');
const productRoutes = require('./routes/product');



// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/user' ,userRoutes); // Protect user routes with auth middleware
app.use('/api/products',  productRoutes); // Protect product routes with auth middleware





// app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
