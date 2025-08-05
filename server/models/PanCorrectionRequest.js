const mongoose = require("mongoose");

const PanCorrectionRequestSchema = new mongoose.Schema({
  panNumber: { type: String, required: true },
  name: { type: String, required: true },
  dob: { type: String, required: true },
  mobile: { type: String, required: true },
  email: { type: String, required: true },
  mode: { type: String, enum: ["scan", "ekyc"], required: true },
  category: { type: String, default: "INDIVIDUAL" },
  panType: { type: String, enum: ["Physical PAN Card", "Both"], required: true },
  status: { type: String, default: "Pending" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  orderId: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("PanCorrectionRequest", PanCorrectionRequestSchema);
