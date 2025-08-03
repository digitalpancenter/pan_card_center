const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  wallet: { type: Number, default: 0 },
  role: {
    type: String,
    enum: ["admin", "master-distributor", "distributor", "retailer"],
    default: "retailer",
  },
  mobile: { type: String, default: "" },
  address: { type: String, default: "" },
  photo: { type: String, default: "" },
  otp: String,
  otpExpires: Date,
});

// ✅ Prevent OverwriteModelError
const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
