const mongoose = require("mongoose");

const AadharToPanSchema = new mongoose.Schema({
  uid_number: { type: String, required: true, unique: true },
  pan_number: { type: String, required: true },
});

module.exports = mongoose.model("AadharToPan", AadharToPanSchema);
