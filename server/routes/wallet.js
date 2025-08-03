const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

// 💸 Add Money Route
router.post("/add-money", authMiddleware, async (req, res) => {
  const { amount, utr } = req.body;

  if (!amount || !utr) {
    return res.status(400).json({ message: "Amount and UTR are required." });
  }

  try {
    // Check if UTR already exists
    const existingTransaction = await Transaction.findOne({ utr });
    if (existingTransaction) {
      return res
        .status(400)
        .json({ message: "Pehle se amount add ho rakha hai, naya amount daalein." });
    }

    // Get user
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update wallet balance
    user.wallet += Number(amount);
    await user.save();

    // Save transaction
    const transaction = new Transaction({
      userId: user._id,
      amount,
      utr,
      type: "Credit",
    });
    await transaction.save();

    res.json({ message: `₹${amount} added successfully!` });
  } catch (err) {
    console.error("Add Money Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
