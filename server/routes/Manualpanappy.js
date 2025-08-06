const express = require("express");
const router = express.Router();
const Manualpanappy = require("../models/Manualpanappy");

router.post("/", async (req, res) => {
  try {
    const newApp = new Manualpanappy(req.body);
    await newApp.save();
    res.status(201).json({ message: "Application saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error saving application" });
  }
});

module.exports = router;
