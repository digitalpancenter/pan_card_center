const express = require("express");
const router = express.Router();
const AadharToPan = require("../models/AadharToPan");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { uid_number } = req.body;
  const userEmail = req.user.email;

  if (!uid_number) {
    return res.status(400).json({ message: "Aadhaar number is required" });
  }

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.balance < 20) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    console.log("Searching for UID:", uid_number);
    const data = await AadharToPan.findOne({ uid_number });
    console.log("Found PAN:", data);

    if (!data) {
      return res.status(404).json({ message: "PAN not found for this Aadhaar number" });
    }

    user.balance -= 20;
    await user.save();

    await Transaction.create({
      userEmail: user.email,
      type: "Debit",
      amount: 20,
      description: "Aadhaar to PAN Lookup"
    });

    res.status(200).json({ panNumber: data.pan_number });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
