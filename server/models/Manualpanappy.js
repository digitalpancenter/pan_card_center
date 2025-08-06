const mongoose = require("mongoose");

const ManualpanappySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  referenceNumber: { type: String, required: true },
  status: { type: String, default: "Pending" },

  lastName: String,
  firstName: String,
  nameOnCard: String,
  gender: String,
  dob: String,
  parentType: String,
  parentName: String,
  addressType: String,
  address: String,
  mobile: String,
  email: String,
  aadhaar: String,
  aadhaarName: String,
  incomeSource: String,
  identityProof: String,
  addressProof: String,
  dobProof: String,
  applicantStatus: String,

  // 👇 Extra fields
  acknowledgementNumber: String,
  pdfSlip: String,
  photo: String,
  signature: String,
  pdfForm: String,
}, { timestamps: true });

module.exports = mongoose.model("Manualpanappy", ManualpanappySchema);
