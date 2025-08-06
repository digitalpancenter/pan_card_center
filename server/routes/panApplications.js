const express = require("express");
const router = express.Router();
const PanApplication = require("../models/PanApplication");

router.get("/all", async (req, res) => {
  try {
    const applications = await PanApplication.find().sort({ createdAt: -1 });
    res.json({ success: true, data: applications });
  } catch (err) {
    console.error("Error fetching PAN applications:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

// DELETE PAN Application
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await PanApplication.findByIdAndDelete(id);
    res.status(200).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete" });
  }
});

module.exports = router;
