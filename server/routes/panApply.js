const express = require("express");
const router = express.Router();
const axios = require("axios");
const authMiddleware = require("../middleware/auth");
const PanApplication = require("../models/PanApplication");
const User = require("../models/User");
const Transaction = require("../models/Transaction");

const JUSTPAY_API_KEY = "d2e7a6-5ab764-e3f420-8def89-b620a5";
const JUSTPAY_API_URL = "https://justpay.in.net/api/request_pan.php";

router.post("/", authMiddleware, async (req, res) => {
  const { name, dob, mobile, email, mode, category, panType } = req.body;
  const userId = req.user._id;

  // Only allow NEW_PAN
  if (panType.toUpperCase() !== "NEW_PAN") {
    return res.status(400).json({ success: false, message: "Only NEW_PAN applications allowed." });
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const amountToDeduct = 100;
    if (user.wallet < amountToDeduct) {
      return res.status(400).json({ success: false, message: "Insufficient wallet balance." });
    }

    // Deduct wallet
    user.wallet -= amountToDeduct;
    await user.save();

    // Create order id
    const orderid = `PAN-${Date.now()}`;

    // Save PAN application
    const panApp = new PanApplication({
      name,
      dob,
      mobile,
      email,
      mode,
      category,
      panType,
      userId,
      orderid,
    });
    await panApp.save();

    // Save transaction
    const transaction = new Transaction({
      userId,
      amount: amountToDeduct,
      utr: `DEBIT-${Date.now()}`,
      type: "Debit",
      remark: "New PAN Application",
    });
    await transaction.save();

    // Prepare params for JustPay API
    const params = new URLSearchParams();
    params.append("api_key", JUSTPAY_API_KEY);
    params.append("number", mobile);
    params.append("pan_mode", mode.toUpperCase());  // EKYC or ESIGN
    params.append("pan_type", panType.toUpperCase());  // NEW_PAN
    params.append("return_url", "https://assisted-service.egov.proteantech.in/SpringBootFormHandling/newPanReq");
    params.append("orderid", orderid);

    // Call JustPay API
    const justpayResponse = await axios.post(JUSTPAY_API_URL, params);

    const responseData = justpayResponse.data;

    if (responseData.status === "SUCCESS" && responseData.redirecting_url) {
      return res.json({
        success: true,
        message: "PAN application initiated successfully.",
        redirect_url: responseData.redirecting_url,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: responseData.message || "Failed to initiate PAN application.",
      });
    }
  } catch (err) {
    console.error("PAN apply error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
