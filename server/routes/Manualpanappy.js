const express = require("express");
const router = express.Router();
const ManualPan = require("../models/Manualpanappy");
const User = require("../models/User");
const Transaction = require("../models/Transaction");
const authMiddleware = require("../middleware/auth");
const nodemailer = require("nodemailer");

// Generate a random 14-digit reference number
function generateRefNumber() {
  return Math.floor(10000000000000 + Math.random() * 90000000000000).toString();
}

// Setup Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "radigitalindai@gmail.com",
    pass: "qcsuxmqfmatycvpi", // App-specific password
  },
});

// 📨 Submit PAN form
router.post("/", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const deductionAmount = 110;
    if (user.wallet < deductionAmount) {
      return res.status(400).json({ message: "Insufficient wallet balance" });
    }

    user.wallet -= deductionAmount;
    await user.save();

    const transaction = new Transaction({
      userId,
      amount: deductionAmount,
      type: "Debit",
      description: "PAN Card Application (₹110 cut)",
    });
    await transaction.save();

    const referenceNumber = generateRefNumber();
    const newPan = new ManualPan({
      ...req.body,
      userId,
      referenceNumber,
      status: "Pending",
    });

    await newPan.save();

    const mailOptions = {
      from: '"RDigital PAN Service" <radigitalindai@gmail.com>',
      to: "radigitalindai@gmail.com",
      subject: "New PAN Card Request Submitted",
      html: `
        <h3>New PAN Card Application</h3>
        <p><strong>User:</strong> ${user.name || user.email}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Reference Number:</strong> ${referenceNumber}</p>
        <p><strong>Status:</strong> Pending</p>
        <p>Log in to the admin panel to view full details.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });

    res.status(201).json({
      message: `PAN form submitted. ₹${deductionAmount} cut for PAN Application.`,
      referenceNumber,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// 📥 GET PAN list for logged-in user
router.get("/my-pans", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id;
    const pans = await ManualPan.find({ userId }).sort({ createdAt: -1 });
    res.json(pans);
  } catch (err) {
    console.error("Error fetching PAN list:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// // POST /api/manualpanappy/check-reference
// router.post("/check-reference", async (req, res) => {
//   const { referenceNumber } = req.body;

//   const record = await ManualPan.findOne({ referenceNumber });

//   if (record) {
//     res.json({ success: true });
//   } else {
//     res.status(404).json({ success: false, message: "Reference not found" });
//   }
// });

module.exports = router;
