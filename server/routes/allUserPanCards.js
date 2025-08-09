const express = require("express");
const router = express.Router();
const Manualpanappy = require("../models/Manualpanappy");
const auth = require("../middleware/auth"); // Optional if token is required
const multer = require("multer");
const upload = require("../middleware/upload");
const path = require("path");

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

// DELETE PAN application by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPan = await Manualpanappy.findByIdAndDelete(req.params.id);
    if (!deletedPan) {
      return res.status(404).json({ error: "PAN application not found" });
    }
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.error("Error deleting PAN application:", error);
    res.status(500).json({ error: "Server error" });
  }
});

// UPDATE PAN application by ID (with file upload support)
router.put(
  "/:id",
upload.fields([
  { name: "photo", maxCount: 1 },
  { name: "signature", maxCount: 1 },
  { name: "pdfForm", maxCount: 1 },
  { name: "pdfSlip", maxCount: 1 },
{ name: "pdfPan", maxCount: 1 } // ✅ new PAN PDF field
]),
  async (req, res) => {
    try {
      const updates = { ...req.body };

      if (req.files) {
        if (req.files.photo) updates.photo = req.files.photo[0].path;
        if (req.files.signature) updates.signature = req.files.signature[0].path;
        if (req.files.pdfForm) updates.pdfForm = req.files.pdfForm[0].path;
        if (req.files.pdfSlip) updates.pdfSlip = req.files.pdfSlip[0].path;
        if (req.files.pdfPan) updates.pdfPan = req.files.pdfPan[0].path;
      }

      const updated = await Manualpanappy.findByIdAndUpdate(req.params.id, updates, {
        new: true,
      });

      if (!updated) return res.status(404).json({ error: "Not found" });

      res.json(updated);
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Server error" });
    }
  }
);


module.exports = router;
