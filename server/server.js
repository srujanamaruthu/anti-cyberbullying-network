// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON
app.use(express.json());

// ----------------------------
// ✅ CORS Configuration
// ----------------------------
const allowedOrigins = [
  "https://anti-cyberbullying-network.vercel.app", // Vercel frontend
  "http://localhost:3000",                         // Local development
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS not allowed for this origin: " + origin));
    }
  },
  credentials: true, // allow sending cookies/auth headers
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ----------------------------
// ✅ Route Imports
// ----------------------------
const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth');

// ----------------------------
// ✅ Use Routes
// ----------------------------
app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

// ----------------------------
// ✅ Test Route
// ----------------------------
app.get('/', (req, res) => {
  res.send('🛡️ Anti-Cyberbullying Backend is running');
});

// ----------------------------
// ✅ MongoDB Connection
// ----------------------------
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to MongoDB');

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err.message);
});
