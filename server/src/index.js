require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Log every request (for debugging)
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// Routes
const authRoutes = require('./routes/authRoutes');
const verifyToken = require('./middleware/authMiddleware');
app.use('/api/auth', authRoutes);

// Test route
app.get('/', (_req, res) => {
  console.log("GET / hit");
  res.send('Chat API is running');
});

app.get('/api/protected', verifyToken,(req,res) => {
    res.json({
        message:'You hvae accessed a protected route!',
        user:req.user,
    });
});

// 404 Fallback
app.use((_req, res) => {
  res.status(404).send('Route not found');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});