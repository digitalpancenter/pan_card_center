// const express = require("express");
// const router = express.Router();
// const Manualpanappy = require("../models/Manualpanappy"); // Make sure model exists

// // GET all PAN applications
// router.get("/all-pans", async (req, res) => {
//   try {
//     const pans = await Manualpanappy.find();
//     res.status(200).json(pans);
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch PAN applications" });
//   }
// });

// module.exports = router;

// routes/panApply.js or similar file
const express = require("express");
const router = express.Router();
const Manualpanappy = require("../models/Manualpanappy");
const auth = require("../middleware/auth"); // optional if token is required

// GET all PAN card applications
router.get("/all-pans", async (req, res) => {
  try {
    const allPans = await Manualpanappy.find().sort({ createdAt: -1 });
    res.json(allPans);
  } catch (error) {
    console.error("Error fetching all PANs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE route
router.delete('/:id', async (req, res) => {
  try {
    const deletedPan = await PanApplication.findByIdAndDelete(req.params.id);
    if (!deletedPan) {
      return res.status(404).json({ error: 'PAN application not found' });
    }
    res.status(200).json({ message: 'Deleted successfully' });
  } catch (error) {
    console.error('Error deleting PAN application:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
