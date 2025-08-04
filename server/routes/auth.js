const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth"); // ✅ Corrected path

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// ✅ Register
// ✅ Updated Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, mobile, address, role } = req.body; // role included

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      mobile,
      address,
      role, // ✅ Save role here
    });

    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


// ✅ Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "7d",
    });

  res.json({
  token,
  user: {
    name: user.name,
    email: user.email,
    wallet: user.wallet,
    role: user.role, // ✅ Include role in response
  },
});
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});



router.get("/profile", authMiddleware, async (req, res) => {
  res.json(req.user);
});


module.exports = router;
