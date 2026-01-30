const express = require("express");
const router = express.Router();
const { registerPartner, getPartners, updatePartnerStatus, deletePartner } = require("../controllers/partners.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public route - register partner
router.post("/register", registerPartner);

// Admin routes (protected)
router.get("/", protect, adminOnly, getPartners);
router.patch("/:id/status", protect, adminOnly, updatePartnerStatus);
router.delete("/:id", protect, adminOnly, deletePartner);

module.exports = router;
