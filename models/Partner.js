const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
    },
    gender: {
      type: String,
      enum: ["male", "female", ""],
      default: "",
    },
    dateOfBirth: {
      type: String,
    },
    salvationExperience: {
      type: String,
      enum: ["yes", "looking", "no", ""],
      default: "",
    },
    howHeard: {
      type: String,
      enum: ["friend", "social", "church", "website", "other", ""],
      default: "",
    },
    interests: [{
      type: String,
    }],
    skills: {
      type: String,
    },
    comments: {
      type: String,
    },
    status: {
      type: String,
      enum: ["pending", "contacted", "approved", "rejected"],
      default: "pending",
    },
    notes: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);
