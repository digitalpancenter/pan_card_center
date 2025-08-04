const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");           // handles register/login
const walletRoutes = require("./routes/wallet");
const transactionsRoute = require("./routes/transactions");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Correct mounting
app.use("/api/auth", authRoutes);     
app.use("/api/admin", adminRoutes);   
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionsRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/rndigitalindia")
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
