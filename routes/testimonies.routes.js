const express = require("express");
const router = express.Router();
const {
  createTestimony,
  getTestimonies,
  getTestimony,
  approveTestimony,
  deleteTestimony,
  getAllTestimonies,
} = require("../controllers/testimonies.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public routes
router.get("/", getTestimonies);
router.get("/:id", getTestimony);
router.post("/", createTestimony);

// Admin routes (protected)
router.get("/admin/all", protect, adminOnly, getAllTestimonies);
router.patch("/:id/approve", protect, adminOnly, approveTestimony);
router.delete("/:id", protect, adminOnly, deleteTestimony);

module.exports = router;