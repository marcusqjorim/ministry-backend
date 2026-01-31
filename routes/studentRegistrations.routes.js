const express = require("express");
const router = express.Router();
const studentRegistrationsController = require("../controllers/studentRegistrations.controller");
const { protect } = require("../middleware/auth.middleware");

// Public route - submit registration
router.post("/", studentRegistrationsController.createRegistration);

// Protected admin routes
router.get("/", protect, studentRegistrationsController.getAllRegistrations);
router.put("/:id/status", protect, studentRegistrationsController.updateRegistrationStatus);
router.delete("/:id", protect, studentRegistrationsController.deleteRegistration);

module.exports = router;
