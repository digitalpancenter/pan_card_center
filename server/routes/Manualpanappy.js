const express = require("express");
const router = express.Router();
const ManualPan = require("../models/Manualpanappy");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/auth");

// Generate a random 14-digit reference number
function generateRefNumber() {
  return Math.floor(10000000000000 + Math.random() * 90000000000000).toString();
}

router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const deductionAmount = 110;

    if (user.wallet < deductionAmount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // Deduct ₹110
    user.wallet -= deductionAmount;
    await user.save();

    // Add transaction with clear name
    const transaction = new Transaction({
      userId,
      amount: deductionAmount,
      type: "Debit",
      description: "PAN Card Application (₹110 cut)",
    });
    await transaction.save();

    // Save PAN form with status and reference number
    const referenceNumber = generateRefNumber();

    const newPan = new ManualPan({
      ...req.body,
      userId,
      referenceNumber,
      status: "Pending", // Default status
    });

    await newPan.save();

    res.status(201).json({
      message: `PAN form submitted. ₹${deductionAmount} cut for PAN Application.`,
      referenceNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
