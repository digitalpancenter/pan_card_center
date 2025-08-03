const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const Transaction = require("../models/Transaction");

router.get("/my-transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user._id }).sort({ date: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch transactions" });
  }
});

module.exports = router;
