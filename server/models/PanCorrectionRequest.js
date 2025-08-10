const mongoose = require("mongoose");

const PanCorrectionRequestSchema = new mongoose.Schema({
  apiKey: { type: String, required: true },
  number: { type: String, required: true },
  panMode: { type: String, enum: ["EKYC", "ESIGN"], required: true },
  panType: { type: String, enum: ["new_pan", "correction"], required: true },
  returnUrl: { type: String, required: true },
  orderId: { type: String, required: true },
  txnId: { type: String },
  redirectingUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model("PanCorrectionRequest", PanCorrectionRequestSchema);
