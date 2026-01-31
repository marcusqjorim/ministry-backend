const StudentRegistration = require("../models/StudentRegistration");

// Create new student registration
exports.createRegistration = async (req, res) => {
  try {
    const { fullName, email, phone, age, location, interest, message } = req.body;

    const newRegistration = new StudentRegistration({
      fullName,
      email,
      phone,
      age,
      location,
      interest,
      message
    });

    await newRegistration.save();
    res.status(201).json({ 
      success: true,
      message: "Registration submitted successfully",
      data: newRegistration 
    });
  } catch (error) {
    console.error("Error creating registration:", error);
    res.status(500).json({ 
      success: false,
      message: "Error submitting registration" 
    });
  }
};

// Get all student registrations (Admin only)
exports.getAllRegistrations = async (req, res) => {
  try {
    const registrations = await StudentRegistration.find().sort({ createdAt: -1 });
    res.json({ success: true, data: registrations });
  } catch (error) {
    console.error("Error fetching registrations:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching registrations" 
    });
  }
};

// Update registration status (Admin only)
exports.updateRegistrationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const registration = await StudentRegistration.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!registration) {
      return res.status(404).json({ 
        success: false,
        message: "Registration not found" 
      });
    }

    res.json({ 
      success: true,
      message: "Status updated successfully",
      data: registration 
    });
  } catch (error) {
    console.error("Error updating registration:", error);
    res.status(500).json({ 
      success: false,
      message: "Error updating registration" 
    });
  }
};

// Delete registration (Admin only)
exports.deleteRegistration = async (req, res) => {
  try {
    const { id } = req.params;
    const registration = await StudentRegistration.findByIdAndDelete(id);

    if (!registration) {
      return res.status(404).json({ 
        success: false,
        message: "Registration not found" 
      });
    }

    res.json({ 
      success: true,
      message: "Registration deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting registration:", error);
    res.status(500).json({ 
      success: false,
      message: "Error deleting registration" 
    });
  }
};
