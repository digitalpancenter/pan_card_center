const express = require("express");
const router = express.Router();
const axios = require("axios");
const authMiddleware = require("../middleware/auth");
const PanApplication = require("../models/PanCorrectionRequest");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const JUSTPAY_API_KEY = "d2e7a6-5ab764-e3f420-8def89-b620a5";
const JUSTPAY_API_URL = "https://justpay.in.net/api/request_pan.php";
const RETURN_URL = "https://assisted-service.egov.proteantech.in/SpringBootFormHandling/crPanReq";

router.post("/", authMiddleware, async (req, res) => {
  const { name, dob, mobile, email, mode, category, panType, panNumber } = req.body;
  const userId = req.user._id;

  console.log("Received body:", req.body);
  if (!name || !dob || !mobile || !email || !mode || !category || !panType || !panNumber) {
    console.log("Validation failed: Missing parameters");
    return res.status(400).json({ success: false, message: "Missing required parameters." });
  }

  if (panType.toUpperCase() !== "CORRECTION") {
    return res.status(400).json({ success: false, message: "Only CORRECTION applications allowed." });
  }

  if (!["EKYC", "ESIGN"].includes(mode.toUpperCase())) {
    return res.status(400).json({ success: false, message: "Invalid mode. Must be EKYC or ESIGN." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const amountToDeduct = 98;
    if (user.wallet < amountToDeduct) {
      return res.status(400).json({ success: false, message: "Insufficient wallet balance." });
    }

    user.wallet -= amountToDeduct;
    await user.save();

    const orderId = `PANUP-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    const panApp = new PanApplication({
      apiKey: JUSTPAY_API_KEY,
     number: mobile, // Must be exactly 10 digits
      panMode: mode.toUpperCase(),
      panType: "correction",
      returnUrl: RETURN_URL,
      orderId,
      name,
      dob,
      email,
      category,
      userId,
      panNumber,
    });
    await panApp.save();

    const transaction = new Transaction({
      userId,
      amount: amountToDeduct,
      utr: `DEBIT-${Date.now()}`,
      type: "Debit",
      remark: "Update PAN Application (Correction)",
    });
    await transaction.save();

    const params = {
      api_key: JUSTPAY_API_KEY,
      number: mobile, // Must be exactly 10 digits
      pan_mode: mode.toUpperCase(),
      pan_type: "correction",
      return_url: RETURN_URL,
      orderid: orderId,
    };
    console.log("JustPay API Request Params:", params);

    const justpayResponse = await axios.get(JUSTPAY_API_URL, { params, timeout: 10000 })
      .catch(error => {
        console.error("JustPay API error details:", {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message,
          config: error.config,
        });
        throw error;
      });
    console.log("JustPay Response:", justpayResponse.data);
    const responseData = justpayResponse.data;

    if (responseData.status === "SUCCESS" && responseData.redirecting_url) {
      panApp.txnId = responseData.txnid;
      panApp.redirectingUrl = responseData.redirecting_url;
      await panApp.save();

      return res.json({
        success: true,
        message: "PAN correction initiated successfully.",
        redirect_url: responseData.redirecting_url,
      });
    } else {
      user.wallet += amountToDeduct;
      await user.save();
      await Transaction.deleteOne({ _id: transaction._id });
      await PanApplication.deleteOne({ orderId });

      return res.status(400).json({
        success: false,
        message: responseData.message || "Failed to initiate PAN correction. Ensure name/DOB match Aadhaar exactly, or try a different PAN.",
      });
    }
  } catch (err) {
    console.error("PAN correction error:", err);
    const user = await User.findById(userId);
    if (user) {
      user.wallet += 98;
      await user.save();
    }
    await Transaction.deleteMany({ userId, remark: "Update PAN Application (Correction)", type: "Debit" }).sort({ createdAt: -1 }).limit(1);
    await PanApplication.deleteMany({ userId }).sort({ createdAt: -1 }).limit(1);

    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;