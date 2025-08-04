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

<<<<<<< HEAD
// ✅ Correct mounting
app.use("/api/auth", authRoutes);     
app.use("/api/admin", adminRoutes);   
=======
// 🛠 Increase body size limit
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Mount routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
>>>>>>> 211bb68 (your message)
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionsRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/rndigitalindia")
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
