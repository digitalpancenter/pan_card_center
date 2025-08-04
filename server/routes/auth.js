// const express = require("express");
// const router = express.Router();
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcryptjs");
// const User = require("../models/User");
// const authMiddleware = require("../middleware/auth"); // ✅ Corrected path

// const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// // ✅ Register
// // ✅ Updated Register Route
// router.post("/register", async (req, res) => {
//   const { name, email, password, mobile, address, role } = req.body; // role included

//   try {
//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       mobile,
//       address,
//       role, // ✅ Save role here
//     });

//     await newUser.save();

//     res.status(201).json({ message: "User registered successfully" });
//   } catch (err) {
//     console.error("Register Error:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });


// // ✅ Login
// router.post("/login", async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(401).json({ message: "Invalid email or password" });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

//     const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
//       expiresIn: "7d",
//     });

//   res.json({
//   token,
//   user: {
//     name: user.name,
//     email: user.email,
//     wallet: user.wallet,
//     role: user.role, // ✅ Include role in response
//   },
// });
//   } catch (error) {
//     console.error("Login Error:", error);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// router.get("/profile", authMiddleware, async (req, res) => {
//   res.json(req.user);
// });

// router.get("/all-users", authMiddleware, /* adminMiddleware, */ async (req, res) => {
//   try {
//     // DB se saare users fetch karo, password hata ke
//     const users = await User.find().select("-password").sort({ name: 1 }); // A to Z sort by name

//     res.json(users);
//   } catch (err) {
//     console.error("Error fetching all users:", err);
//     res.status(500).json({ message: "Server error" });
//   }
// });



// module.exports = router;


const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const multer = require("multer");
const path = require("path");

const JWT_SECRET = process.env.JWT_SECRET || "yourSecretKey";

// Multer setup for photo upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// ✅ Register Route
router.post("/register", async (req, res) => {
  const { name, email, password, mobile, address, role } = req.body;

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
      role,
      aadharNumber: "",
      panNumber: "",
      photo: "",
      isActive: true,
      isBlocked: false,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Login Route with isBlocked and isActive checks
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid email or password" });

    if (user.isBlocked) {
      return res.status(403).json({
        message: "Your account is blocked. Contact Admin at 7061805159.",
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is deactivated. Contact Admin at 7061805159.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
        wallet: user.wallet,
        role: user.role,
        isActive: user.isActive,
        isBlocked: user.isBlocked,
        photo: user.photo,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Upload or update user photo
router.post("/upload-photo", authMiddleware, upload.single("photo"), async (req, res) => {
  try {
    const photoPath = req.file.path;
    const user = await User.findByIdAndUpdate(req.user._id, { photo: photoPath }, { new: true });
    res.json({ message: "Photo uploaded successfully", photo: user.photo });
  } catch (err) {
    console.error("Photo Upload Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Get current profile
router.get("/profile", authMiddleware, async (req, res) => {
  res.json(req.user);
});

// ✅ Get all users
router.get("/all-users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ name: 1 });
    res.json(users);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Edit user: activate/block/update fields
router.put("/edit-user/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  try {
    const user = await User.findByIdAndUpdate(id, updateFields, { new: true }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User updated successfully", user });
  } catch (err) {
    console.error("User Edit Error:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

