const express = require('express');
const dotenv = require('dotenv');

const connectDB = require('./db');
const cors = require("cors");

const app = express();


// 🔓 Allow all origins (default, for development)
app.use(cors());
dotenv.config();
connectDB(); // Connect to MongoDB
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
const authRoutes = require('./routes/auth');



// Use routes
app.use('/api/auth', authRoutes);




// app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
