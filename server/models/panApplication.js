const mongoose = require("mongoose");

const panApplicationSchema = new mongoose.Schema({
  name: String,
  dob: String,
  mobile: String,
  email: String,
  mode: String,
  category: String,
  panType: String,
  panNumber: String,
  userId: String,
  orderid: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PanApplication", panApplicationSchema);
