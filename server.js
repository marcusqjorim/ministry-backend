const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");

dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// CORS configuration for frontend
app.use(cors({
  origin: [
    "http://localhost:5173", 
    "http://localhost:5174",
    "https://lighthearted-flan-d6cea5.netlify.app"
  ],
}));

app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/testimonies', require('./routes/testimonies.routes'));
app.use('/api/events', require('./routes/events.routes'));
app.use('/api/partners', require('./routes/partners.routes'));

// Health check endpoints
app.get("/api/health", (req, res) => {
  res.json({ status: "API & DB OK" });
});

app.get("/api/db-test", (req, res) => {
  res.json({
    status: "Connected",
    db: mongoose.connection.name,
  });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

module.exports = app;
