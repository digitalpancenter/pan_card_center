// models/AadharToPan.js
const mongoose = require("mongoose");

const AadharToPanSchema = new mongoose.Schema({
  uid_number: { type: String, required: true, unique: true },
  pan_number: { type: String, required: true },
  fetchedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("AadharToPan", AadharToPanSchema);
