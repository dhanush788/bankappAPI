const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());


// Supabase connection
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Middleware to attach Supabase to all requests
app.use((req, res, next) => {
  req.supabase = supabase;
  next();
});

// Import routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Use routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/payments', orderRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
