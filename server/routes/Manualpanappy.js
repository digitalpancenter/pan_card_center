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

    // Log the transaction
    const transaction = new Transaction({
      userId,
      amount: deductionAmount,
      type: "Debit",
      description: "PAN Card Application (₹110 cut)",
    });
    await transaction.save();

    // Generate reference number
    const referenceNumber = generateRefNumber();

    // Save PAN form
    const newPan = new ManualPan({
      ...req.body,
      userId,
      referenceNumber,
      status: "Pending",
    });

    await newPan.save();

    // Send Email Notification
    const mailOptions = {
      from: '"RDigital PAN Service" <radigitalindai@gmail.com>',
      to: "radigitalindai@gmail.com", // Receiver email
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

// Example: routes/panApply.js or similar
router.delete('/pan-apply/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await PanApplication.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'PAN application not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error("Error deleting PAN:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});




module.exports = router;
