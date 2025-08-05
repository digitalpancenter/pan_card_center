const express = require("express");
const router = express.Router();
const axios = require("axios");
const authMiddleware = require("../middleware/auth");
const PanCorrection = require("../models/PanCorrectionRequest");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const JUSTPAY_API_KEY = "d2e7a6-5ab764-e3f420-8def89-b620a5";
const JUSTPAY_API_URL = "https://justpay.in.net/api/request_pan.php";

// ✅ PROTECTED ROUTE
router.post("/", authMiddleware, async (req, res) => {
  const { name, dob, mobile, email, mode, category, panType, panNumber } = req.body;
  const userId = req.user._id;

  console.log("✅ Received form data:", req.body);

  try {
    // ✅ Check user exists
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // ✅ Check wallet balance
    const amountToDeduct = 100;
    if (user.wallet < amountToDeduct) {
      return res.status(400).json({ success: false, message: "Insufficient wallet balance." });
    }

    // ✅ Deduct from wallet
    user.wallet -= amountToDeduct;
    await user.save();

    // ✅ Generate Order ID
    const orderId = `PAN-${Date.now()}`;

    // ✅ Save PAN Correction Request
    const panCrp = new PanCorrection({
      name,
      dob,
      mobile,
      email,
      mode,
      category,
      panType,
      panNumber,
      userId,
      orderId,
    });
    await panCrp.save();

    // ✅ Save Transaction
    const transaction = new Transaction({
      userId,
      amount: amountToDeduct,
      utr: `DEBIT-${Date.now()}`,
      type: "Debit",
      remark: "correction PAN Application",
    });
    await transaction.save();

    // ✅ Prepare request to JustPay
    const params = new URLSearchParams();
    params.append("api_key", JUSTPAY_API_KEY);
    params.append("number", mobile);
    params.append("pan_mode", mode.toUpperCase());
    params.append("pan_type", "correction");
    params.append("return_url", "https://assisted-service.egov.proteantech.in/SpringBootFormHandling/crPanReq");
    params.append("orderid", orderId);

    console.log("📤 Sending to JustPay:", {
      api_key: JUSTPAY_API_KEY,
      number: mobile,
      pan_mode: mode.toUpperCase(),
      pan_type: "correction",
      return_url: "https://assisted-service.egov.proteantech.in/SpringBootFormHandling/crPanReq",
      orderid: orderId,
    });

    // ✅ Send to JustPay
    const justpayResponse = await axios.post(JUSTPAY_API_URL, params);
    const responseData = justpayResponse.data;

    console.log("📥 JustPay API response:", responseData);

    if (responseData.status === "SUCCESS" && responseData.redirecting_url) {
      return res.json({
        success: true,
        redirect_url: responseData.redirecting_url,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: responseData.message || "Failed to initiate PAN application.",
      });
    }
  } catch (err) {
    console.error("❌ PAN apply error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
