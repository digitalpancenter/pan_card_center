const mongoose = require("mongoose");

const ManualpanappySchema = new mongoose.Schema({
  lastName: String,
  firstName: String,
  nameOnCard: String,
  gender: String,
  dob: String,
  parentType: String,
  parentName: String,
  addressType: String,
  mobile: String,
  email: String,
  aadhaar: String,
  aadhaarName: String,
  incomeSource: String,
  identityProof: String,
  addressProof: String,
  dobProof: String,
});

module.exports = mongoose.model("Manualpanappy", ManualpanappySchema);
