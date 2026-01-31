const mongoose = require("mongoose");

const studentRegistrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  age: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  interest: {
    type: String,
    required: true,
    enum: ["Fashion Design", "Tailoring", "Both"]
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ["pending", "contacted", "enrolled", "rejected"],
    default: "pending"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("StudentRegistration", studentRegistrationSchema);
