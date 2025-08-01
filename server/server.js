// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load .env variables
dotenv.config();

// Create Express app
const app = express();

// Allow CORS only from your frontend Vercel app
app.use(cors({
  origin: "https://anti-cyberbullying-network.vercel.app",
  methods: ["GET", "POST", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Routes
const reportRoutes = require('./routes/reports');
const authRoutes = require('./routes/auth');

app.use('/api/reports', reportRoutes);
app.use('/api/auth', authRoutes);

// Test route
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
  console.error('❌ MongoDB connection error:', err);
});
