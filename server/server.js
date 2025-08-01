// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json());

// CORS Setup — allow frontend from Vercel + allow others during development
const allowedOrigins = [
  "https://anti-cyberbullying-network.vercel.app", // ✅ Production
  "http://localhost:3000",                        // ✅ Development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

// Import routes
const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth');

// Use routes
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('🛡️ Anti-Cyberbullying Backend is running');
});

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
