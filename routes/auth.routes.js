const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  updateUserStatus,
  deleteUser,
} = require("../controllers/auth.controller");
const { protect, adminOnly } = require("../middleware/auth.middleware");

// Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected routes (admin only)
router.get("/users", protect, adminOnly, getUsers);
router.patch("/users/:id/status", protect, adminOnly, updateUserStatus);
router.delete("/users/:id", protect, adminOnly, deleteUser);

module.exports = router;