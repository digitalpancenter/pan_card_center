// routes/aadharToPan.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const User = require("../models/User"); // your existing User model
const Transaction = require("../models/Transaction"); // your existing Transaction model
const AadharToPan = require("../models/AadharToPan");
const auth = require("../middleware/auth"); // your JWT/auth middleware

// Hardcoded JustPay API key (as requested)
const JUSTPAY_API_KEY = "d2e7a6-5ab764-e3f420-8def89-b620a5";
// Replace this if JustPay provides a different endpoint
const JUSTPAY_API_URL = "https://justpay.in.net/api/aadhar_to_pan.php";

// Helper: safe JSON extract
function safeGet(obj, path, fallback = undefined) {
  return path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : fallback), obj);
}

router.post("/", auth, async (req, res) => {
  const { uid_number } = req.body;
  const userEmail = req.user?.email;

  if (!uid_number || typeof uid_number !== "string" || uid_number.trim().length !== 12) {
    return res.status(400).json({ message: "Valid 12-digit Aadhaar number is required" });
  }

  try {
    // find user
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Step A: check local cache first
    const cached = await AadharToPan.findOne({ uid_number });
    if (cached && cached.pan_number) {
      return res.status(200).json({ panNumber: cached.pan_number, source: "cache" });
    }

    // Step B: ensure wallet balance
    if (user.wallet < 20) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    // Deduct ₹20 upfront (you can move this after successful external call if desired)
    user.wallet -= 20;
    await user.save();

    await Transaction.create({
      userId: user._id,
      type: "Debit",
      amount: 20,
      remark: "Aadhaar to PAN Lookup (attempt)"
    });

    // Call external JustPay API
    let jpResponse;
    try {
      jpResponse = await axios.get(JUSTPAY_API_URL, {
        params: { api_key: JUSTPAY_API_KEY, uid: uid_number },
        timeout: 15000 // 15s
      });
    } catch (err) {
      // On external API failure: refund and respond accordingly
      console.error("JustPay request failed:", err.response?.status, err.message);
      // refund
      user.wallet += 20;
      await user.save();
      await Transaction.create({
        userId: user._id,
        type: "Credit",
        amount: 20,
        remark: "Refund - Aadhaar to PAN Lookup (external API error)"
      });
      return res.status(502).json({ message: "External PAN lookup service unavailable" });
    }

    const data = jpResponse.data;
    console.log("JustPay API Response:", data);

    // Path to PAN in response might vary; try common keys
    const panFromJustpay = safeGet(data, "pan_number") || safeGet(data, "pan") || safeGet(data, "data.pan") || safeGet(data, "result.pan");

    if (panFromJustpay) {
      // Save to local DB for caching
      try {
        await AadharToPan.create({ uid_number, pan_number: panFromJustpay });
      } catch (ignoreErr) {
        // ignore duplicate key or save errors, but log
        console.warn("Could not save AadharToPan cache:", ignoreErr.message);
      }

      return res.status(200).json({ panNumber: panFromJustpay, source: "justpay" });
    } else {
      // If service returned but no PAN -> refund
      user.wallet += 20;
      await user.save();

      await Transaction.create({
        userId: user._id,
        type: "Credit",
        amount: 20,
        remark: "Refund - Aadhaar to PAN Lookup (no PAN found)"
      });

      const msg = (safeGet(data, "message") || safeGet(data, "error") || "PAN not found for given Aadhaar");
      return res.status(404).json({ message: msg });
    }
  } catch (err) {
    console.error("Error in Aadhaar to PAN API:", err);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
