const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const adminRoutes = require("./routes/admin");
const authRoutes = require("./routes/auth");
const walletRoutes = require("./routes/wallet");
const transactionsRoute = require("./routes/transactions");
const panApplyRoute = require("./routes/panApply");
const panApplicationsRoute = require("./routes/panApplications");
const panUpdateRoute = require("./routes/panUpdate");
const ManualpanappyRoute = require("./routes/Manualpanappy");
const allUserPanCards = require("./routes/allUserPanCards"); // ✅ Added

const app = express();
app.use("/uploads", express.static("uploads"));


app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/transactions", transactionsRoute);
app.use("/api/pan-apply", panApplyRoute);
app.use("/api/pan-apply", allUserPanCards); // ✅ Registered here
app.use("/api/pan-update", panUpdateRoute);
app.use("/api/pan-applications", panApplicationsRoute);
app.use("/api/Manualpanappy", ManualpanappyRoute);

const PORT = process.env.PORT || 5000;

mongoose
  .connect("mongodb://127.0.0.1:27017/rndigitalindia")
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
