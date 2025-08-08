const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  amount: Number,
  utr: String,
  type: { type: String, default: "Debit" }, // Debit for deductions
  purpose: String, // Example: "Aadhaar to PAN Lookup"
  date: { type: Date, default: Date.now },
});

module.exports =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", transactionSchema);
