const express = require("express");
const router = express.Router();
const {
  createEvent,
  getEvents,
  getEvent,
  updateEvent,
  deleteEvent,
  getAllEvents,
  toggleFeatured,
} = require("../controllers/events.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Admin routes (protected) - MUST come before /:id routes
router.get("/admin/all", protect, adminOnly, getAllEvents);
router.post("/", protect, adminOnly, createEvent);
router.put("/:id", protect, adminOnly, updateEvent);
router.delete("/:id", protect, adminOnly, deleteEvent);
router.patch("/:id/featured", protect, adminOnly, toggleFeatured);

// Public routes - come after admin routes
router.get("/", getEvents);
router.get("/:id", getEvent);

module.exports = router;